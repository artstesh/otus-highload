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
    private readonly IOtusContextFactory _contextFactory;
    private readonly IShardManager _shardManager;
    private readonly List<IMigration> _migrations;

    public DbSeedService(IOtusContextFactory contextFactory, IShardManager shardManager)
    {
        _contextFactory = contextFactory;
        _shardManager = shardManager;
        _migrations = new List<IMigration>
        {
            new MessagesMigration(contextFactory)
        };
    }

    public void Seed()
    {
        _shardManager.GetAllActiveShardsAsync().ForEach(s => ApplyMigrations(s));
    }

    private void ApplyMigrations(DialogShard dialogShard)
    {
        try
        {
            var dbName = Regex.Match(dialogShard.ConnectionString, "Database=([^;]+);").Groups[1].Value;
            _contextFactory.Get(Regex.Replace(dialogShard.ConnectionString,"Database[^;]+;","")).Execute(conn =>
            {
                conn.Execute($"CREATE DATABASE {dbName}");
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        _contextFactory.Get(dialogShard.ConnectionString).Execute(conn =>
        {
            conn.Execute("CREATE TABLE IF NOT EXISTS \"Migrations\" (Id uuid not null);");
        });
        foreach (var migration in _migrations) migration.Migrate(dialogShard.ConnectionString);
    }
}
