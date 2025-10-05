using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using OtusHighload.Application.Repositories;
using OtusHighload.Entities;

namespace OtusHighload.Application.Services;

// Services/IFeedCacheService.cs
public interface IFeedCacheService
{
    Task<IEnumerable<Post>> GetFeedAsync(Guid userId, CancellationToken ct);
    Task UpdateFeedAsync(Guid userId, Post post, CancellationToken ct);
    Task RebuildFeedAsync(Guid userId, CancellationToken ct);
    Task InvalidateFeedAsync(Guid userId, CancellationToken ct);
    Task AddPostToFriendFeedsAsync(Guid authorId, Post post, CancellationToken ct);
    Task RemovePostFromFriendFeedsAsync(Guid authorId, Guid postId, CancellationToken ct);
}

// Services/FeedCacheService.cs
public class FeedCacheService : IFeedCacheService
{
    private readonly IDistributedCache _cache;
    private readonly IPostRepository _postRepository;
    private readonly IFriendRepository _friendRepository;
    private readonly ILogger<FeedCacheService> _logger;
    private const int FeedSize = 1000;
    private static readonly TimeSpan CacheExpiration = TimeSpan.FromMinutes(30);

    public FeedCacheService(
        IDistributedCache cache,
        IPostRepository postRepository,
        IFriendRepository friendRepository,
        ILogger<FeedCacheService> logger)
    {
        _cache = cache;
        _postRepository = postRepository;
        _friendRepository = friendRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<Post>> GetFeedAsync(Guid userId, CancellationToken ct)
    {
        var cacheKey = GetFeedCacheKey(userId);
        var cachedData = await _cache.GetStringAsync(cacheKey);

        if (!string.IsNullOrEmpty(cachedData))
        {
            try
            {
                var posts = JsonSerializer.Deserialize<List<Post>>(cachedData);
                if (posts != null)
                {
                    _logger.LogDebug("Cache hit for user {UserId}", userId);
                    return posts.Take(FeedSize);
                }
            }
            catch (JsonException ex)
            {
                _logger.LogWarning(ex, "Failed to deserialize cached feed for user {UserId}", userId);
            }
        }

        _logger.LogDebug("Cache miss for user {UserId}, rebuilding feed", userId);
        return await RebuildAndCacheFeedAsync(userId, ct);
    }

    public async Task UpdateFeedAsync(Guid userId, Post post, CancellationToken ct)
    {
        var cacheKey = GetFeedCacheKey(userId);
        var cachedData = await _cache.GetStringAsync(cacheKey);

        if (!string.IsNullOrEmpty(cachedData))
        {
            try
            {
                var posts = JsonSerializer.Deserialize<List<Post>>(cachedData) ?? new List<Post>();

                // Добавляем новый пост в начало и ограничиваем размер
                posts = posts.Prepend(post).Take(FeedSize).ToList();

                await CacheFeedAsync(userId, posts);
                _logger.LogDebug("Updated feed in cache for user {UserId}", userId);
            }
            catch (JsonException ex)
            {
                _logger.LogWarning(ex, "Failed to update cached feed for user {UserId}", userId);
            }
        }
    }

    public async Task RebuildFeedAsync(Guid userId, CancellationToken ct)
    {
        await RebuildAndCacheFeedAsync(userId, ct);
        _logger.LogInformation("Rebuilt feed cache for user {UserId}", userId);
    }

    public async Task InvalidateFeedAsync(Guid userId, CancellationToken ct)
    {
        var cacheKey = GetFeedCacheKey(userId);
        await _cache.RemoveAsync(cacheKey);
        _logger.LogDebug("Invalidated feed cache for user {UserId}", userId);
    }

    public async Task AddPostToFriendFeedsAsync(Guid authorId, Post post, CancellationToken ct)
    {
        var friendIds = await _friendRepository.GetFriendIdsAsync(authorId, ct);

        var tasks = friendIds.Select(async friendId =>
        {
            try
            {
                await UpdateFeedAsync(friendId, post, ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update feed for friend {FriendId} with post from {AuthorId}", friendId, authorId);
            }
        });

        await Task.WhenAll(tasks);
        _logger.LogDebug("Added post {PostId} to {Count} friend feeds", post.Id, friendIds.Count());
    }

    public async Task RemovePostFromFriendFeedsAsync(Guid authorId, Guid postId, CancellationToken ct)
    {
        var friendIds = await _friendRepository.GetFriendIdsAsync(authorId, ct);

        var tasks = friendIds.Select(async friendId =>
        {
            try
            {
                await InvalidateFeedAsync(friendId, ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to invalidate feed for friend {FriendId} after post removal", friendId);
            }
        });

        await Task.WhenAll(tasks);
        _logger.LogDebug("Invalidated feeds for {Count} friends after post {PostId} removal", friendIds.Count(), postId);
    }

    private async Task<IEnumerable<Post>> RebuildAndCacheFeedAsync(Guid userId, CancellationToken ct)
    {
        var posts = (await _postRepository.GetFeedAsync(userId, ct, FeedSize)).ToList();
        await CacheFeedAsync(userId, posts);
        return posts;
    }

    private async Task CacheFeedAsync(Guid userId, IEnumerable<Post> posts)
    {
        var cacheKey = GetFeedCacheKey(userId);
        var serializedPosts = JsonSerializer.Serialize(posts);

        await _cache.SetStringAsync(
            cacheKey,
            serializedPosts,
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = CacheExpiration
            });
    }

    private static string GetFeedCacheKey(Guid userId) => $"user_feed:{userId}";
}
