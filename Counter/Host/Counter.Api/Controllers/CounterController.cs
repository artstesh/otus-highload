using Counter.Api.Services;
using Counter.Application.Services;
using Counter.Entities;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class CountersController : Controller
{
    private readonly ICounterService _counterService;
    private readonly ISagaCoordinator _sagaCoordinator;

    public CountersController(ICounterService counterService, ISagaCoordinator sagaCoordinator)
    {
        _counterService = counterService;
        _sagaCoordinator = sagaCoordinator;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserCounter>> GetUnreadCount(Guid userId, CancellationToken tkn)
    {
        var counter = await _counterService.GetUnreadCountAsync(userId, tkn);
        return Ok(counter);
    }

    [HttpPost("mark-read")]
    public async Task<ActionResult> MarkMessageAsRead([FromBody] MarkMessageReadRequest request, CancellationToken tkn)
    {
        var sagaId = await _sagaCoordinator.StartMarkMessageReadSagaAsync(request.MessageId, request.UserId, tkn);

        return Accepted(new { SagaId = sagaId, Message = $"SAGA finished", IsSuccesful = sagaId != null });
    }
}

public record MarkMessageReadRequest(Guid MessageId, Guid UserId);
