using Dialogs.Application.Services;
using Dialogs.Contracts.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dialogs.Api.Controllers;

[ApiController]
[Route("[controller]/{userId}")]
public class DialogController : ControllerBase
{
    private readonly IDialogService _dialogService;
    private readonly ILogger<DialogController> _logger;

    public DialogController(IDialogService dialogService, ILogger<DialogController> logger)
    {
        _dialogService = dialogService;
        _logger = logger;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendMessage(
        [FromRoute] Guid userId,
        [FromBody] SendMessageRequest request)
    {
        try
        {
            var messageId = await _dialogService.SendMessageAsync(
                userId,
                request.ToUserId,
                request.Text);

            return Ok(new { MessageId = messageId });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending message");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    [HttpGet("list/with/{withUserId}")]
    public async Task<IActionResult> GetDialog(
        [FromRoute] Guid userId,
        Guid withUserId)
    {
        try
        {
            var messages = await _dialogService.GetDialogAsync(userId, withUserId);
            return Ok(messages);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting dialog");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    [HttpGet("list/all")]
    public async Task<IActionResult> GetAllUserMessages([FromRoute] Guid userId)
    {
        try
        {
            var messages = await _dialogService.GetAllUserMessagesAsync(userId);
            return Ok(messages);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all user messages");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    [HttpGet("mark/{id}/read/{read}")]
    public async Task<IActionResult> GetAllUserMessages([FromQuery] Guid id, [FromQuery] bool read)
    {
        try
        {
            return Ok(await _dialogService.MarkMessageAsAsync(id, read));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error marking a message read status");
            return Ok(false);
        }
    }
}
