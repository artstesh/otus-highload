using Common.DataAccess;
using Dapper;

namespace Geo.DataAccess.Migrations;

public class FieldsMigration : IMigration
{
    private readonly IOtusContextFactory _factory;

    public FieldsMigration(IOtusContextFactory contextFactory)
    {
        _factory = contextFactory;
        MigrationId = Guid.Parse("53C263A5-3FF5-419B-80E6-C388AC70EEAD");
    }

    public override void Migrate()
    {
        var exists = _factory.Get().Query<int>(conn =>
        {
            return conn.QueryFirst<int>($"select count(*) from \"Migrations\" where id = '{MigrationId}'");
        }) > 0;

        if (exists) return;

        _factory.Get().Execute(conn => conn.Execute("DROP TABLE IF EXISTS fields;"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                @"CREATE EXTENSION IF NOT EXISTS ""uuid-ossp"";
                  CREATE EXTENSION IF NOT EXISTS postgis;
                  create table fields
                  (
                      id      uuid default uuid_generate_v4() not null,
                      region_id    uuid                         not null,
                      polygon geometry(Polygon,4326)                        not null,
                      point geometry(Point, 4326) generated always as (ST_Centroid(polygon)) stored not null
                  );
                  DROP INDEX IF EXISTS idx_fields_point;
                  DROP INDEX IF EXISTS idx_fields_polygon;
                  CREATE INDEX idx_fields_point ON fields USING GIST(point);
                  CREATE INDEX idx_fields_polygon ON fields USING GIST(polygon);"));
        _factory.Get().Execute(conn => conn.Execute($"insert into \"Migrations\" (id) values ('{MigrationId}');"));
    }
}
