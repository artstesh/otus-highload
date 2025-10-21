using Common.DataAccess;
using Dapper;
using Geo.Application.Repositories;
using Geo.Entities;
using Microsoft.Extensions.Logging;

namespace Geo.DataAccess.Repositories;

public class FieldRepository : IFieldRepository
{
    private readonly IOtusContextFactory _factory;
    private readonly ILogger<FieldRepository> _logger;

    public FieldRepository(IOtusContextFactory factory, ILogger<FieldRepository> logger)
    {
        _factory = factory;
        _logger = logger;
    }

    public Task<Guid?> Add(GeoField field, CancellationToken tkn)
    {
        var sql = @"INSERT INTO fields (id,region_id, polygon)
                   VALUES (@Id,@RegionId, st_simplify(st_geomfromtext(@Wkt), .0015)) RETURNING id";

        return _factory.Get().QueryAsync(conn =>
        {
            return conn.QueryFirstOrDefaultAsync<Guid?>(new CommandDefinition(sql, parameters: field,
                cancellationToken: tkn));
        });
    }

    public Task<IEnumerable<GeoField>> Get(double[] extent, int zoom, CancellationToken tkn)
    {
        var includePolygons = zoom >= 13 ? ", st_astext(polygon) as Wkt" : "";
        var sql = $"select id as Id, region_id as RegionId, st_x(point) as Lon, st_y(point) as Lat" +
                  $"{includePolygons} from fields " +
                  $"where st_contains(st_makeenvelope({extent[0]}, {extent[1]}, {extent[2]}, {extent[3]}), point);";

        return _factory.Get().QueryAsync<IEnumerable<GeoField>>(conn =>
            conn.QueryAsync<GeoField>(new CommandDefinition(sql, cancellationToken: tkn)));
    }
}
