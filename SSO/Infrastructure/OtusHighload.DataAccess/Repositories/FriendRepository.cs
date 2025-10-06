using Common.DataAccess;
using Dapper;
using OtusHighload.Application.Repositories;
using OtusHighload.Entities;

namespace OtusHighload.DataAccess.Repositories;

public class FriendRepository: Repository<Friendship,Guid>, IFriendRepository
{
    public FriendRepository(IOtusContextFactory factory) : base(factory, "friendships")
    {
    }

    public Task<IEnumerable<Guid>> GetFriendIdsAsync(Guid userId, CancellationToken ct)
    {
        const string sql = "(SELECT \"FriendId\" FROM friendships WHERE \"UserId\" = @UserId) UNION (SELECT \"UserId\" FROM friendships WHERE \"FriendId\" = @UserId)";
        var queryArgs = new { UserId = userId };
        return _factory.Get().QueryAsync<IEnumerable<Guid>>(f =>
        {
            return f.QueryAsync<Guid>(sql,queryArgs);
        });
    }

    public async Task<bool> FriendshipExistsAsync(Guid userId, Guid friendId, CancellationToken ct)
    {
        const string sql = "SELECT COUNT(1) FROM friendships WHERE (\"UserId\" = @UserId AND \"FriendId\" = @FriendId) OR (\"UserId\" = @FriendId AND \"FriendId\" = @UserId);";
        var queryArgs = new { UserId = userId, FriendId = friendId };
        var friendshipExistsAsync = await _factory.Get().QueryAsync(f =>
        {
            return f.ExecuteScalarAsync<int>(sql,queryArgs);
        });
        return friendshipExistsAsync > 0;
    }
}
