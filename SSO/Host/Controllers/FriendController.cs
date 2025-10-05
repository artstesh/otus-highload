using Microsoft.AspNetCore.Mvc;
using OtusHighload.Application.Services;

namespace OtusHighload.Controllers;

[ApiController]
[Route("[controller]")]
public class FriendController : Controller
{
    private readonly IFriendshipService _friendService;
    private readonly IFeedCacheService _feedCacheService;
    private readonly ILogger<FriendController> _logger;

    public FriendController(
        IFriendshipService friendService,
        IFeedCacheService feedCacheService,
        ILogger<FriendController> logger)
    {
        _friendService = friendService;
        _feedCacheService = feedCacheService;
        _logger = logger;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddFriend([FromQuery] Guid userId, [FromQuery] Guid friendId, CancellationToken ct)
    {
        var success = await _friendService.AddFriendAsync(userId, friendId, ct);
        if (!success) return BadRequest("Failed to add friend");

        // Инвалидируем кэши обоих пользователей
        _ = Task.Run(async () =>
        {
            try
            {
                await _feedCacheService.InvalidateFeedAsync(userId, ct);
                await _feedCacheService.InvalidateFeedAsync(friendId, ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to invalidate feeds after friendship creation");
            }
        });

        return Ok();
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> RemoveFriend([FromQuery] Guid userId, [FromQuery] Guid friendId, CancellationToken ct)
    {
        var success = await _friendService.RemoveFriendAsync(userId, friendId, ct);
        if (!success) return BadRequest("Failed to remove friend");

        // Инвалидируем кэши обоих пользователей
        _ = Task.Run(async () =>
        {
            try
            {
                await _feedCacheService.InvalidateFeedAsync(userId, ct);
                await _feedCacheService.InvalidateFeedAsync(friendId, ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to invalidate feeds after friendship removal");
            }
        });

        return Ok();
    }
}
