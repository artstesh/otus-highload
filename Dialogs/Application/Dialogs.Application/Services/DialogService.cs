using Common.Utility;
using Dapper;
using Dialogs.DataAccess.Managers;
using Dialogs.Entities;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Dialogs.Application.Services;

public interface IDialogService
{
    Task<Guid> SendMessageAsync(Guid fromUserId, Guid toUserId, string text);
    Task<IEnumerable<Message>> GetDialogAsync(Guid user1, Guid user2);
    Task<IEnumerable<Message>> GetAllUserMessagesAsync(Guid userId);
    Task<int> GetUserMessageCountAsync(Guid userId);
}

public class DialogService : IDialogService
{
    private readonly IRequestContext _requestContext;
    private readonly IShardManager _shardManager;
    private readonly ILogger<DialogService> _logger;

    public DialogService(IRequestContext requestContext,IShardManager shardManager, ILogger<DialogService> logger)
    {
        _requestContext = requestContext;
        _shardManager = shardManager;
        _logger = logger;
    }

    public async Task<Guid> SendMessageAsync(Guid fromUserId, Guid toUserId, string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            throw new ArgumentException("Message text cannot be empty", nameof(text));

        var shardKey = ShardKeyGenerator.GetShardKeyForMessage(fromUserId, toUserId);
        var connectionString = _shardManager.GetShardConnectionString(shardKey);

        using var connection = new NpgsqlConnection(connectionString);

        var message = new Message
        {
            Id = Guid.NewGuid(),
            FromUserId = fromUserId,
            ToUserId = toUserId,
            Text = text,
            SentAt = DateTime.UtcNow,
            ShardKey = shardKey
        };

        var sql = @"INSERT INTO messages (id, from_user_id, to_user_id, text, sent_at, shard_key)
                   VALUES (@Id, @FromUserId, @ToUserId, @Text, @SentAt, @ShardKey)";

        await connection.ExecuteAsync(sql, message);

        _logger.LogInformation($"{_requestContext.RequestId}: Message {message.Id} sent from {fromUserId} to {toUserId}");
        return message.Id;
    }

    public async Task<IEnumerable<Message>> GetDialogAsync(Guid user1, Guid user2)
    {
        var shardKey = ShardKeyGenerator.GetShardKeyForMessage(user1, user2);
        var connectionString = _shardManager.GetShardConnectionString(shardKey);

        using var connection = new NpgsqlConnection(connectionString);

        var sql = @"SELECT id as Id, from_user_id as FromUserId, to_user_id as ToUserId, text as Text, sent_at as SentAt, shard_key as ShardKey FROM messages
                   WHERE (from_user_id = @user1 AND to_user_id = @user2)
                      OR (from_user_id = @user2 AND to_user_id = @user1)
                   ORDER BY sent_at";

        var messages = await connection.QueryAsync<Message>(sql, new { user1, user2 });

        _logger.LogDebug($"{_requestContext.RequestId}: Retrieved {messages.Count()} messages for dialog between {user1} and {user2}");
        return messages;
    }

    public async Task<IEnumerable<Message>> GetAllUserMessagesAsync(Guid userId)
    {
        var allShards = _shardManager.GetAllActiveShardsAsync();
        var tasks = allShards.Select(shard =>
            GetUserMessagesFromShardAsync(shard.ConnectionString, userId));

        var results = await Task.WhenAll(tasks);
        var allMessages = results.SelectMany(x => x)
                               .OrderBy(x => x.SentAt)
                               .ToList();

        _logger.LogDebug($"{_requestContext.RequestId}: Retrieved {allMessages.Count} total messages for user {userId}");
        return allMessages;
    }

    public async Task<int> GetUserMessageCountAsync(Guid userId)
    {
        var allShards = _shardManager.GetAllActiveShardsAsync();
        var tasks = allShards.Select(shard =>
            GetUserMessageCountFromShardAsync(shard.ConnectionString, userId));

        var results = await Task.WhenAll(tasks);
        return results.Sum();
    }

    private async Task<IEnumerable<Message>> GetUserMessagesFromShardAsync(string connectionString, Guid userId)
    {
        try
        {
            using var connection = new NpgsqlConnection(connectionString);
            var sql = @"SELECT id as Id, from_user_id as FromUserId, to_user_id as ToUserId, text as Text, sent_at as SentAt, shard_key as ShardKey FROM messages
                       WHERE from_user_id = @userId OR to_user_id = @userId
                       ORDER BY sent_at";

            return await connection.QueryAsync<Message>(sql, new { userId });
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, $"{_requestContext.RequestId}: Failed to get messages from shard for user {userId}");
            return Enumerable.Empty<Message>();
        }
    }

    private async Task<int> GetUserMessageCountFromShardAsync(string connectionString, Guid userId)
    {
        try
        {
            using var connection = new NpgsqlConnection(connectionString);
            var sql = @"SELECT COUNT(*) FROM messages
                       WHERE from_user_id = @userId OR to_user_id = @userId";

            return await connection.ExecuteScalarAsync<int>(sql, new { userId });
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, $"{_requestContext.RequestId}: Failed to get message count from shard for user {userId}");
            return 0;
        }
    }
}
