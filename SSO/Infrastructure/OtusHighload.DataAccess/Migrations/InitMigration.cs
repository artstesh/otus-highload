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
        var exists = _factory.Create().Query<int>(conn =>
        {
            return conn.QueryFirst<int>($"select count(*) from 'migrations' where id = {MigrationId}");
        }) > 0;
        if (exists) return;
        _factory.Create().Execute(conn => conn.Execute("DROP TABLE IF EXISTS users;"));
        _factory.Create().Execute(conn =>
            conn.Execute(
                @"create table users (
                  Id uuid default gen_random_uuid() not null,
                  FirstName varchar(120) not null,
                  LastName  varchar(120) not null,
                  BirthDate date,
                  City varchar(120) not null,
                  Hobby text default '' not null);"));
        _factory.Create().Execute(conn => conn.Execute($"insert into 'migrations' (id) values '{MigrationId}';"));
    }
}
