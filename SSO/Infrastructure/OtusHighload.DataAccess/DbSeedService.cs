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
            new InitMigration(contextFactory),
            new PostsMigration(contextFactory)
        };
    }

    public void Seed()
    {
        try
        {
            dbName = Regex.Match(_contextFactory.GetConnectionString(), "Database=([^;]+);").Groups[1].Value;
            _contextFactory.Get(Regex.Replace((_contextFactory.GetConnectionString()),"Database[^;]+;","")).Execute(conn =>
            {
                conn.Execute($"CREATE DATABASE {dbName}");
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        _contextFactory.Get().Execute(conn =>
        {
            conn.Execute("CREATE TABLE IF NOT EXISTS \"Migrations\" (Id uuid not null);");
        });
        foreach (var migration in _migrations) migration.Migrate();
    }
}
