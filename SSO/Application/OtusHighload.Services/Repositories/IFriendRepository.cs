using Common.DataAccess;
using OtusHighload.Entities;

namespace OtusHighload.Application.Repositories;

public interface IFriendRepository : IRepository<Friendship,Guid>
{
    Task<IEnumerable<Guid>> GetFriendIdsAsync(Guid userId, CancellationToken ct);
    Task<bool> FriendshipExistsAsync(Guid userId, Guid friendId, CancellationToken ct);
}
