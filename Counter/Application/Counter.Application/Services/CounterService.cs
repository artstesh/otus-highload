using System.Text.Json;
using Counter.Application.Repositories;
using Counter.Entities;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;

namespace Counter.Application.Services;

public interface ICounterService
{
    Task<UserCounter> GetUnreadCountAsync(Guid userId, CancellationToken ct);
    Task<bool> IncrementUnreadCountAsync(Guid userId, CancellationToken ct);
    Task<bool> DecrementUnreadCountAsync(Guid userId, CancellationToken ct);
}

public class CounterService : ICounterService
{
    private readonly ICounterRepository _repository;
    private readonly IDistributedCache _cache;
    private readonly ILogger<CounterService> _logger;
    private static readonly TimeSpan CacheExpiration = TimeSpan.FromMinutes(30);

    public CounterService(
        ICounterRepository repository,
        IDistributedCache cache,
        ILogger<CounterService> logger)
    {
        _repository = repository;
        _cache = cache;
        _logger = logger;
    }

    public async Task<UserCounter> GetUnreadCountAsync(Guid userId, CancellationToken ct)
    {
        var cacheKey = GetCacheKey(userId);
        var cached = await _cache.GetAsync(cacheKey);
        if (cached != null)
        {
            _logger.LogDebug("Cache hit for user {UserId}", userId);
            return JsonSerializer.Deserialize<UserCounter>(cached)!;;
        }

        _logger.LogDebug("Cache miss for user {UserId}, querying database", userId);

        var counter = await _repository.GetByUserIdAsync(userId);

        // Сохраняем в кеш
        await CacheAsync(cacheKey,counter);

        return counter;
    }

    public async Task<bool> IncrementUnreadCountAsync(Guid userId, CancellationToken ct)
    {
        try
        {
            var success = await _repository.IncrementAsync(userId);
            if (success)
            {
                await InvalidateCacheAsync(userId,ct);
                _logger.LogInformation("Incremented counter for user {UserId}", userId);
            }
            return success;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to increment counter for user {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> DecrementUnreadCountAsync(Guid userId, CancellationToken ct)
    {
        try
        {
            var success = await _repository.DecrementAsync(userId);
            if (success)
            {
                await InvalidateCacheAsync(userId,ct);
                _logger.LogInformation("Decremented counter for user {UserId}", userId);
            }
            return success;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to decrement counter for user {UserId}", userId);
            return false;
        }
    }

    public async Task InvalidateCacheAsync(Guid userId, CancellationToken ct)
    {
        var cacheKey = GetCacheKey(userId);
        await _cache.RemoveAsync(cacheKey);
        _logger.LogDebug("Invalidated feed cache for user {UserId}", userId);
    }

    private async Task CacheAsync(string cacheKey, UserCounter counter)
    {
        await _cache.SetStringAsync(
            cacheKey, JsonSerializer.Serialize(counter),
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = CacheExpiration
            });
    }

    private static string GetCacheKey(Guid userId) => $"counter:{userId}";
}
