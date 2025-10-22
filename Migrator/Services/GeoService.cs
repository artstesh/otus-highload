using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Common.Http.Extensions;
using Geo.Entities;

namespace AgroPlatform.Migrator.Services;

public class GeoService
{
    private readonly HttpClient _httpClient;

    public GeoService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    internal async Task<List<Region>> GetRegions()
    {
        return await _httpClient.GetFromJsonAsync<List<Region>>("region");
    }

    internal async Task Reset()
    {
        await _httpClient.PostAsync("cluster/reset", null);
    }
}
