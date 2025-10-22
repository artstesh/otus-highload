using Common.DataAccess;
using Dapper;
using Fields.DataAccess.Managers;
using Fields.DataAccess.Migrations;
using IMigration = Fields.DataAccess.Migrations.IMigration;

namespace Fields.DataAccess;

using IMigration = IMigration;

public class DbSeedService
{
    private readonly IShardManager _shardManager;
    private readonly List<IMigration> _migrations;

    public DbSeedService(IShardManager shardManager)
    {
        _shardManager = shardManager;
        _migrations = new List<IMigration>
        {
            new FieldsMigration()
        };
    }

    public void Seed()
    {
        _shardManager.GetAllActiveShardsAsync().ForEach(ApplyMigrations);
    }

    private void ApplyMigrations(string connectionString)
    {
        new OtusContextFactory(connectionString, []).Get(connectionString).Execute(conn =>
        {
            conn.Execute("CREATE TABLE IF NOT EXISTS \"Migrations\" (Id uuid not null);");
        });
        foreach (var migration in _migrations) migration.Migrate(connectionString);
    }
}
