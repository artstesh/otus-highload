using Common.DataAccess;
using OtusHighload.Entities;

namespace OtusHighload.Application.Repositories;

public interface IPostRepository : IRepository<Post,Guid>
{
    Task<IEnumerable<Post>> GetByUserIdAsync(Guid userId, CancellationToken ct, int limit = 1000);
    Task<IEnumerable<Post>> GetFeedAsync(Guid userId, CancellationToken ct, int limit = 1000);
    Task<IEnumerable<Post>> GetPostsByUserIdsAsync(IEnumerable<Guid> userIds, CancellationToken ct, int limit = 1000);
}
