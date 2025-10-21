using Geo.Application.Services;
using Geo.Contracts;
using Geo.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Fields.Controllers;

[ApiController]
[Route("[controller]")]
public class FieldController : ControllerBase
{
    private readonly IFieldService _service;
    private readonly ILogger<FieldController> _logger;

    public FieldController(IFieldService service, ILogger<FieldController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpPost("")]
    public async Task<Guid?> Add([FromBody] GeoField request, CancellationToken tkn)
    {
        try
        {
            return await _service.Add(request, tkn);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating a field");
            throw;
        }
    }

    [HttpPost("by-bounding-box")]
    public async Task<IEnumerable<GeoField>> Get([FromBody] GetByBoundingBoxRequest request, CancellationToken tkn)
    {
        try
        {
            return await _service.Get(request.Extent, request.Zoom, tkn);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting a bounding box");
            throw;
        }
    }
}
