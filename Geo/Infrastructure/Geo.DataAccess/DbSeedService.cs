using Common.DataAccess;
using Dapper;
using Geo.DataAccess.Migrations;
using IMigration = Geo.DataAccess.Migrations.IMigration;

namespace Geo.DataAccess;

using IMigration = IMigration;

public class DbSeedService
{
    private readonly IOtusContextFactory _contextFactory;
    private readonly List<IMigration> _migrations;

    public DbSeedService(IOtusContextFactory contextFactory)
    {
        _contextFactory = contextFactory;
        _migrations = new List<IMigration>
        {
            new RegionsMigration(contextFactory),
            new FieldsMigration(contextFactory),
            new ClustersMigration(contextFactory)
        };
    }

    public void Seed()
    {
        ApplyMigrations();
    }

    private void ApplyMigrations()
    {
        _contextFactory.Get().Execute(conn =>
        {
            conn.Execute("CREATE TABLE IF NOT EXISTS \"Migrations\" (Id uuid not null);");
        });
        foreach (var migration in _migrations) migration.Migrate();
    }
}
