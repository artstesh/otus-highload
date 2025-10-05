using OtusHighload.Application.Repositories;
using OtusHighload.Entities;

namespace OtusHighload.Application.Services;

public interface IPostService
{
    Task<Post?> GetByIdAsync(Guid id, CancellationToken ct);
    Task<Guid?> CreateAsync(Post post, CancellationToken ct);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct);
    Task<IEnumerable<Post>> GetFeedAsync(Guid userId, CancellationToken ct, int limit = 1000);
    Task<IEnumerable<Post>> GetPostsByUserIdsAsync(IEnumerable<Guid> userIds, CancellationToken ct, int limit = 100);
}

public class PostService : IPostService
{
    private readonly IPostRepository _repository;

    private string[] postKeys = new[]
    {
        "Text",
        "AuthorId"
    };

    public PostService(IPostRepository repository)
    {
        _repository = repository;
    }

    public Task<Post?> GetByIdAsync(Guid id, CancellationToken ct)
    {
        return _repository.GetAsync(id, ct);
    }

    public async Task<Guid?> CreateAsync(Post post, CancellationToken ct)
    {
        return await _repository.CreateAsync(postKeys, post, ct);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct)
    {
        return (await _repository.DeleteAsync(id, ct)) == 1;
    }

    public Task<IEnumerable<Post>> GetFeedAsync(Guid userId, CancellationToken ct, int limit = 1000)
    {
        return _repository.GetFeedAsync(userId, ct, limit);
    }

    public Task<IEnumerable<Post>> GetPostsByUserIdsAsync(IEnumerable<Guid> userIds, CancellationToken ct, int limit = 100)
    {
        return _repository.GetPostsByUserIdsAsync(userIds, ct, limit);
    }
}
