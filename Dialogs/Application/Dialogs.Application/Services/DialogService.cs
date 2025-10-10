using Dapper;
using Dialogs.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Dialogs.Application.Services;

public interface IDialogService
{
    Task<Guid> SendMessageAsync(Guid fromUserId, Guid toUserId, string text);
    Task<IEnumerable<Message>> GetDialogAsync(Guid user1, Guid user2);
    Task<IEnumerable<Message>> GetAllUserMessagesAsync(Guid userId);
    Task<int> GetUserMessageCountAsync(Guid userId);
    Task<bool> MarkMessageAsAsync(Guid id, bool read);
}

public class DialogService : IDialogService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<DialogService> _logger;

    public DialogService( ILogger<DialogService> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public async Task<Guid> SendMessageAsync(Guid fromUserId, Guid toUserId, string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            throw new ArgumentException("Message text cannot be empty", nameof(text));

        using var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var message = new Message
        {
            Id = Guid.NewGuid(),
            FromUserId = fromUserId,
            ToUserId = toUserId,
            Text = text,
            SentAt = DateTime.UtcNow
        };

        var sql = @"INSERT INTO messages (id, from_user_id, to_user_id, text, sent_at)
                   VALUES (@Id, @FromUserId, @ToUserId, @Text, @SentAt)";

        await connection.ExecuteAsync(sql, message);

        _logger.LogDebug($"Message {message.Id} sent from {fromUserId} to {toUserId}");
        return message.Id;
    }

    public async Task<bool> MarkMessageAsAsync(Guid id, bool read)
    {
        using var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var queryArgs = new Message
        {
            Id = id,
            IsRead = read
        };

        var sql = @"UPDATE messages SET is_read = @IsRead where id = @Id VALUES (@Id, @IsRead)";

        var affectedRows = await connection.ExecuteAsync(sql, queryArgs);
        return affectedRows > 0;
    }

    public async Task<IEnumerable<Message>> GetDialogAsync(Guid user1, Guid user2)
    {
        using var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var sql = @"SELECT id as Id, from_user_id as FromUserId, to_user_id as ToUserId, text as Text, sent_at as SentAt, is_read as IsRead FROM messages
                   WHERE (from_user_id = @user1 AND to_user_id = @user2)
                      OR (from_user_id = @user2 AND to_user_id = @user1)
                   ORDER BY sent_at";

        var messages = await connection.QueryAsync<Message>(sql, new { user1, user2 });

        _logger.LogDebug($"Retrieved {messages.Count()} messages for dialog between {user1} and {user2}");
        return messages;
    }

    public async Task<IEnumerable<Message>> GetAllUserMessagesAsync(Guid userId)
    {
        try
        {
            using var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var sql = @"SELECT id as Id, from_user_id as FromUserId, to_user_id as ToUserId, text as Text, sent_at as SentAt, is_read as IsRead FROM messages
                       WHERE from_user_id = @userId OR to_user_id = @userId
                       ORDER BY sent_at";

            return await connection.QueryAsync<Message>(sql, new { userId });
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, $"Failed to get messages from shard for user {userId}");
            return Enumerable.Empty<Message>();
        }
    }

    public async Task<int> GetUserMessageCountAsync(Guid userId)
    {
        try
        {
            using var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var sql = @"SELECT COUNT(*) FROM messages
                       WHERE from_user_id = @userId OR to_user_id = @userId";

            return await connection.ExecuteScalarAsync<int>(sql, new { userId });
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, $"Failed to get message count from shard for user {userId}");
            return 0;
        }
    }
}
