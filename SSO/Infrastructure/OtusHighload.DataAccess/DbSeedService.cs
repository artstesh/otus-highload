using System.Text.RegularExpressions;
using Dapper;
using OtusHighload.DataAccess.Migrations;

namespace OtusHighload.DataAccess;

public class DbSeedService
{
    private readonly IOtusContextFactory _contextFactory;
    private readonly List<IMigration> _migrations;
    private string dbName;

    public DbSeedService(IOtusContextFactory contextFactory)
    {
        _contextFactory = contextFactory;
        _migrations = new List<IMigration>
        {
            new InitMigration(contextFactory)
        };
    }

    public void Seed()
    {
        _contextFactory.Get(_contextFactory.GetConnectionString()).Execute(conn =>
        {
            conn.Execute("CREATE TABLE IF NOT EXISTS \"Migrations\" (Id uuid not null);");
        });
        foreach (var migration in _migrations) migration.Migrate();
    }
}
