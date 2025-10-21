using Common.DataAccess;
using Dapper;

namespace Fields.DataAccess.Migrations;

public class FieldsMigration : IMigration
{
    private readonly IOtusContextFactory _factory;

    public FieldsMigration()
    {
        _factory = new OtusContextFactory();
        MigrationId = Guid.Parse("59D2E919-7D7C-44D2-8174-6A53688B6A3C");
    }

    public override void Migrate(string connectionString)
    {
        var exists = _factory.Get(connectionString).Query<int>(conn =>
        {
            return conn.QueryFirst<int>($"select count(*) from \"Migrations\" where id = '{MigrationId}'");
        }) > 0;

        if (exists) return;

        _factory.Get(connectionString).Execute(conn => conn.Execute("DROP TABLE IF EXISTS fields;"));
        _factory.Get(connectionString).Execute(conn =>
            conn.Execute(
                @"CREATE EXTENSION IF NOT EXISTS ""uuid-ossp"";
                  CREATE EXTENSION IF NOT EXISTS postgis;
                  create table fields
                  (
                      id      uuid default uuid_generate_v4() not null,
                      region_id    varchar                         not null,
                      polygon geometry                        not null
                  );
                  DROP INDEX IF EXISTS idx_fields_polygon;
                  CREATE INDEX idx_fields_polygon ON fields USING GIST(polygon);"));
        _factory.Get(connectionString).Execute(conn => conn.Execute($"insert into \"Migrations\" (id) values ('{MigrationId}');"));
    }
}
