using Microsoft.Extensions.Logging;
using OtusHighload.Application.Repositories;

namespace OtusHighload.Application.Services;

// Services/ICacheRebuildService.cs
public interface ICacheRebuildService
{
    Task RebuildAllFeedsAsync(CancellationToken ct);
    Task RebuildUserFeedAsync(Guid userId,CancellationToken ct);
    Task RebuildFeedsForUsersAsync(IEnumerable<Guid> userIds,CancellationToken ct);
    Task<bool> IsRebuildInProgress(CancellationToken ct);
    Task<int> GetRebuildProgress(CancellationToken ct);
}

// Services/CacheRebuildService.cs
public class CacheRebuildService : ICacheRebuildService
{
    private readonly IFeedCacheService _feedCacheService;
    private readonly IUserRepository _userRepository;
    private readonly ILogger<CacheRebuildService> _logger;
    private readonly SemaphoreSlim _semaphore = new(1, 1);
    private volatile bool _isRebuilding = false;
    private int _currentProgress = 0;
    private int _totalUsers = 0;

    public CacheRebuildService(
        IFeedCacheService feedCacheService,
        IUserRepository userRepository,
        ILogger<CacheRebuildService> logger)
    {
        _feedCacheService = feedCacheService;
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task RebuildAllFeedsAsync(CancellationToken ct)
    {
        await _semaphore.WaitAsync();
        try
        {
            if (_isRebuilding)
            {
                _logger.LogWarning("Cache rebuild is already in progress");
                return;
            }

            _isRebuilding = true;
            _currentProgress = 0;

            var allUserIds = (await _userRepository.ListIds(ct)).ToList();
            _totalUsers = allUserIds.Count();

            _logger.LogInformation("Starting cache rebuild for {UserCount} users", _totalUsers);

            var batchSize = 50;
            var batches = allUserIds.Chunk(batchSize);

            foreach (var batch in batches)
            {
                await RebuildBatchAsync(batch.ToList(), ct);
                _currentProgress += batch.Count();

                var progressPercentage = (_currentProgress * 100) / _totalUsers;
                _logger.LogInformation("Cache rebuild progress: {Progress}% ({Current}/{Total})",
                    progressPercentage, _currentProgress, _totalUsers);

                await Task.Delay(100);
            }

            _logger.LogInformation("Cache rebuild completed successfully");
        }
        finally
        {
            _isRebuilding = false;
            _semaphore.Release();
        }
    }

    public async Task RebuildUserFeedAsync(Guid userId,CancellationToken ct)
    {
        try
        {
            _logger.LogDebug("Rebuilding cache for user {UserId}", userId);
            await _feedCacheService.RebuildFeedAsync(userId, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to rebuild feed cache for user {UserId}", userId);
            throw;
        }
    }

    public async Task RebuildFeedsForUsersAsync(IEnumerable<Guid> userIds,CancellationToken ct)
    {
        var userList = userIds.ToList();
        _logger.LogInformation("Rebuilding cache for {Count} users", userList.Count);

        var tasks = userList.Select(userId =>
            RebuildUserFeedAsync(userId, ct).ContinueWith(t =>
            {
                if (t.IsFaulted)
                {
                    _logger.LogError(t.Exception, "Failed to rebuild cache for user {UserId}", userId);
                }
                return t.IsCompletedSuccessfully;
            }));

        await Task.WhenAll(tasks);
    }

    public Task<bool> IsRebuildInProgress(CancellationToken ct) => Task.FromResult(_isRebuilding);

    public Task<int> GetRebuildProgress(CancellationToken ct) => Task.FromResult(_totalUsers > 0 ? (_currentProgress * 100) / _totalUsers : 0);

    private async Task RebuildBatchAsync(List<Guid> userIds,CancellationToken ct)
    {
        var tasks = userIds.Select(userId =>
            _feedCacheService.RebuildFeedAsync(userId, ct).ContinueWith(t =>
            {
                if (t.IsFaulted)
                {
                    _logger.LogWarning(t.Exception, "Failed to rebuild cache for user {UserId}", userId);
                }
            }));

        await Task.WhenAll(tasks);
    }
}
