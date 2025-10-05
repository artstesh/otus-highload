using OtusHighload.Application.Repositories;
using OtusHighload.Entities;

namespace OtusHighload.Application.Services;

public interface IFriendshipService
{
    Task<bool> AddFriendAsync(Guid userId, Guid friendId, CancellationToken ct);
    Task<bool> RemoveFriendAsync(Guid userId, Guid friendId, CancellationToken ct);
    Task<IEnumerable<Guid>> GetFriendIdsAsync(Guid userId, CancellationToken ct);
    Task<bool> FriendshipExistsAsync(Guid userId, Guid friendId, CancellationToken ct);
}
public class FriendshipService : IFriendshipService
{
    private readonly IFriendRepository _repository;

    private string[] _keys = new[]
    {
        "UserId",
        "FriendId"
    };

    public FriendshipService(IFriendRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> AddFriendAsync(Guid userId, Guid friendId, CancellationToken ct)
    {
        await _repository.CreateAsync(_keys, new Friendship { FriendId = friendId, UserId = userId }, ct);
        return true;
    }

    public async Task<bool> RemoveFriendAsync(Guid userId, Guid friendId, CancellationToken ct)
    {
        var list1 = (await _repository.ListWhereAsync(_keys, new {UserId = userId, FriendId = friendId}, ct));
        var list2 = (await _repository.ListWhereAsync(_keys, new {UserId = friendId, FriendId = userId}, ct));
        if (!list1.Any() && !list2.Any()) return false;
     return (await _repository.DeleteAsync((list1.FirstOrDefault()??list2.First()).Id, ct)) == 1;
    }

    public async Task<IEnumerable<Guid>> GetFriendIdsAsync(Guid userId, CancellationToken ct)
    {
        return await _repository.GetFriendIdsAsync(userId, ct);
    }

    public async Task<bool> FriendshipExistsAsync(Guid userId, Guid friendId, CancellationToken ct)
    {
        return await _repository.FriendshipExistsAsync(userId, friendId, ct);
    }
}
