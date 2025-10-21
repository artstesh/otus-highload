using Common.DataAccess;
using Dapper;
using Geo.Application.Repositories;
using Geo.Entities;

namespace Geo.DataAccess.Repositories;

public class RegionRepository : IRegionRepository
{
    private readonly IOtusContextFactory _factory;

    public RegionRepository(IOtusContextFactory factory)
    {
        _factory = factory;
    }

    public Task<Guid?> DefineRegion(string wkt, CancellationToken tkn)
    {
        var sql = "select id from regions where st_intersects(polygon, st_geomfromtext(@Wkt)) ";

        return _factory.Get().QueryAsync<Guid?>(conn =>
        {
            return conn.QueryFirstOrDefaultAsync<Guid?>(new CommandDefinition(sql, parameters: new { Wkt = wkt },
                cancellationToken: tkn));
        });
    }

    public Task<IEnumerable<Region>> GetRegions(CancellationToken tkn)
    {
        var sql = "select id as Id, st_astext(polygon) as Wkt, name as Name from regions ";

        return _factory.Get().QueryAsync<IEnumerable<Region>>(conn =>
        {
            return conn.QueryAsync<Region>(new CommandDefinition(sql, cancellationToken: tkn));
        });
    }

    // public async Task<bool> FriendshipExistsAsync(Guid userId, Guid friendId, CancellationToken ct)
    // {
    //     const string sql = "SELECT COUNT(1) FROM friendships WHERE (\"UserId\" = @UserId AND \"FriendId\" = @FriendId) OR (\"UserId\" = @FriendId AND \"FriendId\" = @UserId);";
    //     var queryArgs = new { UserId = userId, FriendId = friendId };
    //     var friendshipExistsAsync = await _factory.Get().QueryAsync(f =>
    //     {
    //         return f.ExecuteScalarAsync<int>(sql,queryArgs);
    //     });
    //     return friendshipExistsAsync > 0;
    // }
}
