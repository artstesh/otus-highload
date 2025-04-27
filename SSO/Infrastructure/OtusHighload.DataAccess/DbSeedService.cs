using Dapper;
using OtusHighload.DataAccess.Migrations;

namespace OtusHighload.DataAccess;

public class DbSeedService
{
    private readonly IOtusContextFactory _contextFactory;
    private readonly List<IMigration> _migrations;

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
        _contextFactory.Create().Execute(conn =>
        {
            conn.Execute($"SELECT 'CREATE DATABASE {conn.Database}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '{conn.Database}')\\gexec");
            conn.Execute("CREATE TABLE IF NOT EXISTS \"Migrations\"(Id uuid not null);");
        });
        foreach (var migration in _migrations) migration.Migrate();
    }
}
