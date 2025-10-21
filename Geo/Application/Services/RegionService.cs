using System.Text.Json;
using Geo.Application.Repositories;
using Geo.Entities;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;

namespace Geo.Application.Services;

public interface IRegionService
{
    Task<Guid?> DefineRegion(string wkt, CancellationToken tkn);
    Task<IEnumerable<Region>> GetRegions(CancellationToken tkn);
}

public class RegionService : IRegionService
{
    private readonly IRegionRepository _repository;
    private readonly IDistributedCache _cache;
    private readonly ILogger<IRegionService> _logger;

    public RegionService(IRegionRepository repository, IDistributedCache cache, ILogger<IRegionService> logger)
    {
        _repository = repository;
        _cache = cache;
        _logger = logger;
    }

    public async Task<Guid?> DefineRegion(string wkt, CancellationToken tkn)
    {
        return await _repository.DefineRegion(wkt, tkn);
    }

    public async Task<IEnumerable<Region>> GetRegions(CancellationToken tkn)
    {
        var cacheKey = "regions";
        var cachedData = await _cache.GetStringAsync(cacheKey);
        if (!string.IsNullOrEmpty(cachedData))
        {
            try
            {
                var regions = JsonSerializer.Deserialize<List<Region>>(cachedData);
                return regions ?? new List<Region>();
            }
            catch (JsonException ex)
            {
                _logger.LogWarning(ex, "Failed to deserialize cached regions");
            }
        }
        var list = (await _repository.GetRegions(tkn)).ToList();
        await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(list));
        return list;
    }
}
