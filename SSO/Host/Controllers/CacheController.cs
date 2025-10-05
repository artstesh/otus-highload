using Microsoft.AspNetCore.Mvc;
using OtusHighload.Application.Services;

namespace OtusHighload.Controllers;

[ApiController]
[Route("[controller]")]
public class CacheController: Controller
{
private readonly ICacheRebuildService _cacheRebuildService;
    private readonly ILogger<CacheController> _logger;

    public CacheController(
        ICacheRebuildService cacheRebuildService,
        ILogger<CacheController> logger)
    {
        _cacheRebuildService = cacheRebuildService;
        _logger = logger;
    }

    [HttpPost("rebuild/all")]
    public async Task<IActionResult> RebuildAllCaches(CancellationToken ct)
    {
        if (await _cacheRebuildService.IsRebuildInProgress(ct))
        {
            return Conflict(new { message = "Cache rebuild is already in progress" });
        }

        _ = Task.Run(async () =>
        {
            try
            {
                await _cacheRebuildService.RebuildAllFeedsAsync(ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to rebuild all caches");
            }
        });

        return Accepted(new { message = "Cache rebuild started" });
    }

    [HttpPost("rebuild/user/{userId}")]
    public async Task<IActionResult> RebuildUserCache(Guid userId,CancellationToken ct)
    {
        try
        {
            await _cacheRebuildService.RebuildUserFeedAsync(userId,ct);
            return Ok(new { message = $"Cache rebuilt for user {userId}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to rebuild cache for user {UserId}", userId);
            return StatusCode(500, new { message = "Failed to rebuild cache" });
        }
    }

    [HttpGet("rebuild/progress")]
    public async Task<IActionResult> GetRebuildProgress(CancellationToken ct)
    {
        var isInProgress = await _cacheRebuildService.IsRebuildInProgress(ct);
        var progress = await _cacheRebuildService.GetRebuildProgress(ct);

        return Ok(new
        {
            inProgress = isInProgress,
            progressPercentage = progress
        });
    }

    [HttpPost("rebuild/batch")]
    public async Task<IActionResult> RebuildBatch([FromBody] Guid[] userIds,CancellationToken ct)
    {
        if (userIds == null || userIds.Length == 0)
        {
            return BadRequest(new { message = "User IDs are required" });
        }

        if (userIds.Length > 1000)
        {
            return BadRequest(new { message = "Batch size too large. Maximum 1000 users per batch." });
        }

        try
        {
            await _cacheRebuildService.RebuildFeedsForUsersAsync(userIds, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to rebuild cache batch for {Count} users", userIds.Length);
        }

        return Accepted(new { message = $"Cache rebuild started for {userIds.Length} users" });
    }
}
