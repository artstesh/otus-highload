using Common.Utility;
using Dapper;
using Dialogs.Contracts.Models;
using Dialogs.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Dialogs.DataAccess.Managers;

public interface IShardManager
{
    string GetShardConnectionString(Guid shardKey);
    List<DialogShard> GetAllActiveShardsAsync();
    Task AddShardAsync(string connectionString, int weight = 1);
    Task MigrateDataAsync(Guid shardKey, string fromConnection, string toConnection);
    Task RebalanceShardsAsync();
}

public class ShardManager : IShardManager
{
    private readonly List<DialogShard> _shards;
    private readonly IConfiguration _configuration;
    private readonly ILogger<ShardManager> _logger;

    public ShardManager(IConfiguration configuration, ILogger<ShardManager> logger)
    {
        _configuration = configuration;
        _logger = logger;
        _shards = LoadShardsFromConfig();
    }

    public string GetShardConnectionString(Guid shardKey)
    {
        if (_shards.Count == 0)
            throw new InvalidOperationException("No active shards available");

        var totalWeight = _shards.Where(s => s.IsActive).Sum(s => s.Weight);
        var shardIndex = ShardKeyGenerator.GetShardIndexOptimized(shardKey, totalWeight);

        var currentWeight = 0;
        foreach (var shard in _shards.Where(s => s.IsActive).OrderBy(s => s.ShardId))
        {
            currentWeight += shard.Weight;
            if (shardIndex < currentWeight)
            {
                _logger.LogDebug($"Shard key {shardKey} routed to shard {shard.ShardId}");
                return shard.ConnectionString;
            }
        }

        // Fallback to first shard
        return _shards.First().ConnectionString;
    }

    public async Task AddShardAsync(string connectionString, int weight = 1)
    {
        var newShard = new DialogShard
        {
            ShardId = _shards.Count + 1,
            ConnectionString = connectionString,
            CreatedAt = DateTime.UtcNow,
            IsActive = true,
            Weight = weight
        };

        _shards.Add(newShard);
        await UpdateShardConfigurationAsync();

        _logger.LogInformation($"Added new shard {newShard.ShardId} with weight {weight}");
    }

    public List<DialogShard> GetAllActiveShardsAsync()
    {
        return _shards.Where(s => s.IsActive).ToList();
    }

    public async Task MigrateDataAsync(Guid shardKey, string fromConnection, string toConnection)
    {
        _logger.LogInformation($"Migrating data for shard key {shardKey}");

        using var fromConn = new NpgsqlConnection(fromConnection);
        using var toConn = new NpgsqlConnection(toConnection);

        // Читаем сообщения из исходного шарда
        var messages = await fromConn.QueryAsync<Message>(
            "SELECT id as Id, from_user_id as FromUserId, to_user_id as ToUserId, text as Text, sent_at as SentAt, shard_key as ShardKey FROM messages WHERE shard_key = @shardKey",
            new { shardKey });

        // Пишем в целевой шард
        foreach (var message in messages)
        {
            await toConn.ExecuteAsync(
                @"INSERT INTO messages (id, from_user_id, to_user_id, text, sent_at, shard_key)
                VALUES (@Id, @FromUserId, @ToUserId, @Text, @SentAt, @ShardKey)",
                message);
        }

        _logger.LogInformation($"Migrated {messages.Count()} messages for shard key {shardKey}");
    }

    public async Task RebalanceShardsAsync()
    {
        _logger.LogInformation("Starting shard rebalancing");
        await Task.CompletedTask;
    }

    private List<DialogShard> LoadShardsFromConfig()
    {
        var shards = _configuration.GetSection("Database:Shards")
            .Get<List<DialogShard>>() ?? new List<DialogShard>();

        _logger.LogInformation($"Loaded {shards.Count} shards from configuration");
        return shards;
    }

    private async Task UpdateShardConfigurationAsync()
    {
        // Сохраняем обновленную конфигурацию шардов
        // В реальной системе это может быть в отдельной БД конфигурации
        await Task.CompletedTask;
    }
}
