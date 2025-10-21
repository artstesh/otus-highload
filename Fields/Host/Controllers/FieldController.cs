using Common.Contracts;
using Fields.Application.Services;
using Fields.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Fields.Controllers;

[ApiController]
[Route("[controller]")]
public class FieldController : ControllerBase
{
    private readonly IFieldService _service;
    private readonly IRegionService _regionService;
    private readonly IMessageBusService _messageBusService;
    private readonly ILogger<FieldController> _logger;

    public FieldController(IFieldService service, ILogger<FieldController> logger, IRegionService regionService, IMessageBusService messageBusService)
    {
        _service = service;
        _logger = logger;
        _regionService = regionService;
        _messageBusService = messageBusService;
    }

    [HttpPost("")]
    public async Task<Guid?> Add([FromBody] Field request, CancellationToken ct)
    {
        try
        {
            var regionId = await _regionService.DefineRegion(request.Wkt, ct);
            if (regionId == null) throw new Exception("Region not defined");
            request.RegionId = regionId.Value;
            var guid = await _service.Add(request);
            if (guid != null)
                await _messageBusService.PublishPostCreatedAsync(new FieldCreatedEvent
                {
                    Id = guid.Value, Wkt = request.Wkt, RegionId = request.RegionId
                }, ct);
            return guid;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating a field");
            throw;
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<Field> GetDialog([FromRoute] Guid id)
    {
        try
        {
            return await _service.Get(id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting the field {id}");
            throw;
        }
    }
}
