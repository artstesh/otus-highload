using System.Text.RegularExpressions;
using Common.DataAccess;
using Dapper;
using Dialogs.Contracts.Models;
using Dialogs.DataAccess.Managers;
using Dialogs.DataAccess.Migrations;
using IMigration = Dialogs.DataAccess.Migrations.IMigration;

namespace Dialogs.DataAccess;

public class DbSeedService
{
    private readonly IShardManager _shardManager;
    private readonly List<IMigration> _migrations;

    public DbSeedService(IShardManager shardManager)
    {
        _shardManager = shardManager;
        _migrations = new List<IMigration>
        {
            new MessagesMigration()
        };
    }

    public void Seed()
    {
        _shardManager.GetAllActiveShardsAsync().ForEach(ApplyMigrations);
    }

    private void ApplyMigrations(DialogShard dialogShard)
    {
        new OtusContextFactory(dialogShard.ConnectionString).Get(dialogShard.ConnectionString).Execute(conn =>
        {
            conn.Execute("CREATE TABLE IF NOT EXISTS \"Migrations\" (Id uuid not null);");
        });
        foreach (var migration in _migrations) migration.Migrate(dialogShard.ConnectionString);
    }
}
