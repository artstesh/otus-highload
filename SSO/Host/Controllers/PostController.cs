using Microsoft.AspNetCore.Mvc;
using OtusHighload.Application.Repositories;
using OtusHighload.Application.Services;
using OtusHighload.Contracts.Models;
using OtusHighload.Entities;

namespace OtusHighload.Controllers;

// Controllers/PostController.cs
[ApiController]
[Route("[controller]")]
public class PostController : Controller
{
    private readonly IPostService _postService;
    private readonly IFeedCacheService _feedCacheService;
    private readonly ILogger<PostController> _logger;

    public PostController(
        IPostService postService,
        IFeedCacheService feedCacheService,
        ILogger<PostController> logger)
    {
        _postService = postService;
        _feedCacheService = feedCacheService;
        _logger = logger;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreatePostRequest request, [FromQuery] Guid userId, CancellationToken ct)
    {
        var post = new Post
        {
            AuthorId = userId,
            Text = request.Text
        };

        var postId = await _postService.CreateAsync(post, ct);
        if (postId == null) return Problem();
        post.Id = (Guid)postId;

        _ = Task.Run(async () =>
        {
            try
            {
                await _feedCacheService.AddPostToFriendFeedsAsync(userId, post, ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update friend feeds for new post {PostId}", postId);
            }
        });

        return Ok(new { Id = postId });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(Guid id, [FromQuery] Guid userId, CancellationToken ct)
    {
        var existingPost = await _postService.GetByIdAsync(id, ct);
        if (existingPost == null || existingPost.AuthorId != userId)
            return NotFound();

        var success = await _postService.DeleteAsync(id, ct);
        if (!success) return BadRequest();

        // Инвалидируем кэши друзей
        _ = Task.Run(async () =>
        {
            try
            {
                await _feedCacheService.RemovePostFromFriendFeedsAsync(userId, id, ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to invalidate friend feeds after post deletion {PostId}", id);
            }
        });

        return Ok();
    }

    [HttpGet("get/{id}")]
    public async Task<IActionResult> Get(Guid id, CancellationToken ct)
    {
        var post = await _postService.GetByIdAsync(id, ct);
        if (post == null) return NotFound();
        return Ok(post);
    }

    [HttpGet("feed")]
    public async Task<IActionResult> GetFeed([FromQuery] Guid userId, CancellationToken ct)
    {
        var feed = await _feedCacheService.GetFeedAsync(userId, ct);
        return Ok(feed);
    }
}
