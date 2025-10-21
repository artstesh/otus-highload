using Fields.Contracts.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Fields.DataAccess.Managers;

public interface IShardManager
{
    string GetShardConnectionString(Guid shardKey);
    List<string> GetAllActiveShardsAsync();
}

public class ShardManager : IShardManager
{
    private readonly Dictionary<Guid, string> _shards;
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
        if (!_shards.ContainsKey(shardKey))
            throw new InvalidOperationException("No appropriate shards available");
        return _shards.GetValueOrDefault(shardKey)!;
    }

    public List<string> GetAllActiveShardsAsync()
    {
        return _shards.Values.Select(s => s).ToList();
    }

    private Dictionary<Guid, string> LoadShardsFromConfig()
    {
        var shards = _configuration.GetSection("Database:Shards")
            .Get<List<FieldShard>>() ?? new List<FieldShard>();
        var result = shards.ToDictionary(s => s.RegionId, s => s.ConnectionString);;

        _logger.LogInformation($"Loaded {result.Count} shards from configuration");
        return result;
    }
}
