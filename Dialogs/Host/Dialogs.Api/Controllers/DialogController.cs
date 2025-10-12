using Dialogs.Application.Services;
using Dialogs.Contracts.Models;
using Dialogs.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dialogs.Api.Controllers;

[ApiController]
[Route("[controller]/{userId}")]
public class DialogController : ControllerBase
{
    private readonly IDialogService _dialogService;
    private readonly ILogger<DialogController> _logger;
    private readonly IChatMetrics _metrics;

    public DialogController(IDialogService dialogService, ILogger<DialogController> logger, IChatMetrics metrics)
    {
        _dialogService = dialogService;
        _logger = logger;
        _metrics = metrics;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendMessage(
        [FromRoute] Guid userId,
        [FromBody] SendMessageRequest request)
    {
        using (_metrics.StartRequestTimer())
        {
            try
            {
                var messageId = await _dialogService.SendMessageAsync(
                    userId,
                    request.ToUserId,
                    request.Text);
                _metrics.MessageSend();
                return Ok(new { MessageId = messageId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending message");
                _metrics.RequestFailed();
                return StatusCode(500, new { error = "Internal server error" });
            }
        }
    }

    [HttpGet("list/with/{withUserId}")]
    public async Task<IActionResult> GetDialog(
        [FromRoute] Guid userId,
        Guid withUserId)
    {
        using (_metrics.StartRequestTimer())
        {
            try
            {
                var messages = await _dialogService.GetDialogAsync(userId, withUserId);
                _metrics.DialogGet();
                return Ok(messages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting dialog");
                _metrics.RequestFailed();
                return StatusCode(500, new { error = "Internal server error" });
            }
        }
    }

    [HttpGet("list/all")]
    public async Task<IActionResult> GetAllUserMessages([FromRoute] Guid userId)
    {
        using (_metrics.StartRequestTimer())
        {
            try
            {
                var messages = await _dialogService.GetAllUserMessagesAsync(userId);
                _metrics.MessagesList();
                return Ok(messages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all user messages");
                _metrics.RequestFailed();
                return StatusCode(500, new { error = "Internal server error" });
            }
        }
    }
}
