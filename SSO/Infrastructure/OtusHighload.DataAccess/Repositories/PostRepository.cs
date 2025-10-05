using Common.DataAccess;
using Dapper;
using OtusHighload.Application.Repositories;
using OtusHighload.Entities;

namespace OtusHighload.DataAccess;

public class PostRepository: Repository<Post,Guid>, IPostRepository
{
    public PostRepository(IOtusContextFactory factory) : base(factory, "posts")
    {
    }

    public Task<IEnumerable<Post>> GetByUserIdAsync(Guid userId, CancellationToken ct, int limit = 1000)
    {
        return _factory.Get().QueryAsync<IEnumerable<Post>>(f =>
        {
            var queryArgs = new { AuthorId = userId, Limit = limit };
            return f.QueryAsync<Post>($"SELECT * FROM {_tableName} WHERE p.\"AuthorId\" = @AuthorId ORDER BY p.\"CreatedAt\" DESC LIMIT @Limit",queryArgs);
        });
    }

    public Task<IEnumerable<Post>> GetFeedAsync(Guid userId, CancellationToken ct, int limit = 1000)
    {
        const string sql = @"
            SELECT *
            FROM posts p
            WHERE p.""AuthorId"" IN (
            SELECT ""FriendId"" FROM friendships WHERE ""UserId"" = @UserId
                                                 UNION
            SELECT ""UserId"" FROM friendships WHERE ""FriendId"" = @UserId)
            ORDER BY p.""CreatedAt"" DESC
            LIMIT @Limit";
        var queryArgs = new { UserId = userId, Limit = limit };
        return _factory.Get().QueryAsync<IEnumerable<Post>>(f =>
        {
            return f.QueryAsync<Post>(sql,queryArgs);
        });
    }

    public Task<IEnumerable<Post>> GetPostsByUserIdsAsync(IEnumerable<Guid> userIds, CancellationToken ct, int limit = 1000)
    {
        const string sql = @"
            SELECT *
            FROM posts p
            WHERE p.""AuthorId"" = ANY(@UserIds)
            ORDER BY p.""CreatedAt"" DESC
            LIMIT @Limit";
        var queryArgs = new { UserIds = userIds.ToArray(), Limit = limit };
        return _factory.Get().QueryAsync<IEnumerable<Post>>(f =>
        {
            return f.QueryAsync<Post>(sql,queryArgs);
        });
    }
}
