using System.Net.Http.Json;
using Common.Contracts;
using Common.Http.Extensions;
using Microsoft.Extensions.Logging;

namespace Fields.Application.Services;

public interface IRegionService
{
    Task<Guid?> DefineRegion(string wkt, CancellationToken tkn);
}

public class RegionService : IRegionService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<RegionService> _logger;

    public RegionService(IHttpClientFactory httpClientFactory, ILogger<RegionService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    public async Task<Guid?> DefineRegion(string wkt, CancellationToken tkn)
    {
        return await GetClient().PostAsync<DefineRegionRequest, Guid?>("region/define", new DefineRegionRequest{Wkt = wkt});
    }

    private HttpClient GetClient()
    {
        var client = _httpClientFactory.CreateClient("GeoService");
        return client;
    }
}
