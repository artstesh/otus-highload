using Common.Contracts;
using Geo.Application.Services;
using Geo.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Fields.Controllers;


[ApiController]
[Route("[controller]")]
public class RegionController: ControllerBase
{
    private readonly IRegionService _service;
    private readonly ILogger<RegionController> _logger;

    public RegionController(IRegionService service, ILogger<RegionController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet("")]
    public async Task<IEnumerable<Region>> List(CancellationToken tkn)
    {
        try
        {
            return await _service.GetRegions(tkn);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    [HttpPost("define")]
    public async Task<Guid?> DefineRegion([FromBody] DefineRegionRequest request, CancellationToken tkn)
    {
        try
        {
            var defineRegion = await _service.DefineRegion(request.Wkt, tkn);
            return defineRegion;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating a field");
            throw;
        }
    }
}
