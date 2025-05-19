using Dapper;

namespace OtusHighload.DataAccess.Migrations;

public class InitMigration : IMigration
{
    private readonly IOtusContextFactory _factory;

    public InitMigration(IOtusContextFactory factory)
    {
        _factory = factory;
        MigrationId = Guid.Parse("4341B63B-5C48-4377-A6DB-B0F4ABD4C761");
    }

    public override void Migrate()
    {
        var exists = _factory.Get().Query<int>(conn =>
        {
            return conn.QueryFirst<int>($"select count(*) from \"Migrations\" where id = '{MigrationId}'");
        }) > 0;
        if (exists) return;
        _factory.Get().Execute(conn => conn.Execute("DROP TABLE IF EXISTS users;"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                $"create table users (\"Id\" uuid default gen_random_uuid() not null, \"FirstName\" varchar(120) not null,\"LastName\" varchar(120) not null,\"PasswordHash\" varchar(120) not null,\"BirthDate\" date,\"Male\" bool not null,\"City\" varchar(120) not null,\"Hobby\" text default '' not null);"));
        _factory.Get().Execute(conn => conn.Execute($"insert into \"Migrations\" (id) values ('{MigrationId}');"));
        _factory.Get().Execute(conn => conn.Execute("INSERT INTO users (\"Id\", \"FirstName\", \"LastName\", \"PasswordHash\", \"BirthDate\", \"Male\", \"City\", \"Hobby\") VALUES ('b90940ae-ae81-4f6c-b4f2-6986d0b91d4c', 'Jadon', 'Hermann', '827ccb0eea8a706c4c34a16891f84e7b', '1965-03-13', false, 'Angelastad', 'repellat consequatur est');"));
    }
}
