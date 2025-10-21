using Geo.Application.Services;
using Geo.Contracts;
using Geo.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Fields.Controllers;
[ApiController]
[Route("[controller]")]
public class ClusterController : ControllerBase
{
    private readonly IClusterService _service;
    private readonly ILogger<ClusterController> _logger;

    public ClusterController(IClusterService service, ILogger<ClusterController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpPost("by-bounding-box")]
    public async Task<IEnumerable<FieldCluster>> Get([FromBody] GetByBoundingBoxRequest request, CancellationToken tkn)
    {
        try
        {
            return await _service.Get(request.Extent, tkn);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting a bounding box");
            throw;
        }
    }

    [HttpPost("reset")]
    public Task Get()
    {
        return _service.Reset();
    }
}
