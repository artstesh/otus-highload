using Common.DataAccess;
using Dapper;

namespace OtusHighload.DataAccess.Migrations;

public class InitMigration: IMigration
{
    private readonly IOtusContextFactory _factory;

    public InitMigration(IOtusContextFactory factory)
    {
        _factory = factory;
        MigrationId = Guid.Parse("79583A60-A85B-46EA-9B8C-5AAFEAE4B97A");
    }

    public override void Migrate()
    {
        var exists = _factory.Get().Query<int>(conn =>
        {
            return conn.QueryFirst<int>($"select count(*) from \"Migrations\" where id = '{MigrationId}'");
        }) > 0;
        if (exists) return;
        _factory.Get().Execute(conn => conn.Execute("DROP TABLE IF EXISTS posts;"));
        _factory.Get().Execute(conn => conn.Execute("DROP TABLE IF EXISTS counters;"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                @$"CREATE TABLE sagas (
    id UUID PRIMARY KEY,
    message_id UUID NOT NULL,
    user_id UUID NOT NULL,
    state INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP NULL,
    failure_reason TEXT NULL
);"));
        _factory.Get().Execute(conn =>
            conn.Execute(@$"CREATE TABLE counters (
    user_id UUID PRIMARY KEY,
    unread_count INTEGER NOT NULL,
    last_updated TIMESTAMP NOT NULL);"));
        _factory.Get().Execute(conn =>
            conn.Execute(@$"CREATE INDEX ix_sagas_state ON sagas(state);
CREATE INDEX ix_sagas_created_at ON sagas(created_at);
CREATE INDEX ix_sagas_user_id ON sagas(user_id);
CREATE INDEX ix_sagas_message_id ON sagas(message_id);
-- Индекс для очистки старых SAGA
CREATE INDEX ix_sagas_state_created ON sagas(state, created_at);"));
        _factory.Get().Execute(conn =>
            conn.Execute($"CREATE INDEX ix_counters_user_id ON counters(user_id);"));
        _factory.Get().Execute(conn => conn.Execute($"insert into \"Migrations\" (id) values ('{MigrationId}');"));
    }
}
