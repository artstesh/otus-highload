using Common.DataAccess;
using Dapper;
using Fields.Application.Repositories;
using Fields.DataAccess.Managers;
using Fields.Entities;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Fields.DataAccess.Repositories;

public class FieldRepository : Repository<Field, Guid>, IFieldRepository
{
    private readonly IShardManager _shardManager;
    private readonly ILogger<FieldRepository> _logger;

    public FieldRepository(IOtusContextFactory factory, IShardManager shardManager, ILogger<FieldRepository> logger) :
        base(factory, "regions")
    {
        _shardManager = shardManager;
        _logger = logger;
    }

    public Task<Guid?> Add(Field field)
    {
        if (string.IsNullOrWhiteSpace(field.Wkt))
            throw new ArgumentException("Wkt cannot be empty", nameof(field.Wkt));

        var sql = @"INSERT INTO fields (id, region_id, polygon)
                   VALUES (uuid_generate_v4(), @RegionId, st_geomfromtext(@Wkt)) RETURNING id";


        _logger.LogInformation($"Adding field {field.Id} to shard {field.RegionId}, connection - {_shardManager.GetShardConnectionString(field.RegionId)}");
        return _factory.Get(_shardManager.GetShardConnectionString(field.RegionId)).QueryAsync<Guid?>(conn => { return conn.QueryFirstOrDefaultAsync<Guid?>(sql, field); });
    }

    public Task<Field?> Get(Guid fieldId)
    {
        var sql = "select id as Id, region_id as RegionId, st_astext(polygon) from fields where id = @Id";

        return _factory.Get().QueryAsync<Field?>(conn =>
        {
            return conn.QueryFirstOrDefaultAsync<Field?>(sql, new { Id = fieldId });
        });
    }

    public async Task<bool> Delete(Guid fieldId)
    {
        var sql = "delete from fields where id = @Id";

        return (await _factory.Get().QueryAsync(conn => { return conn.ExecuteAsync(sql, new { Id = fieldId }); })) > 0;
    }
}
