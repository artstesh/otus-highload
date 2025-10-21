using Common.DataAccess;
using Dapper;
using Geo.Application.Repositories;
using Geo.Entities;
using Microsoft.Extensions.Logging;

namespace Geo.DataAccess.Repositories;

public class ClusterRepository : IClusterRepository
{
    private readonly IOtusContextFactory _factory;
    private readonly ILogger<FieldRepository> _logger;

    public ClusterRepository(IOtusContextFactory factory, ILogger<FieldRepository> logger)
    {
        _factory = factory;
        _logger = logger;
    }

    public Task Reset()
    {
        var sql = "refresh materialized view field_clusters;";
        return _factory.Get().ExecuteAsync(conn =>
            conn.ExecuteAsync(new CommandDefinition(sql)));
    }

    public Task<IEnumerable<FieldCluster>> Get(double[] extent, CancellationToken tkn)
    {
        var sql = $"select count as Count, st_x(point) as Lon, st_y(point) as Lat " +
                  $"from field_clusters " +
                  $"where st_contains(st_makeenvelope({extent[0]}, {extent[1]}, {extent[2]}, {extent[3]}), point);";

        return _factory.Get().QueryAsync<IEnumerable<FieldCluster>>(conn =>
            conn.QueryAsync<FieldCluster>(new CommandDefinition(sql, cancellationToken: tkn)));
    }
}
