using Common.DataAccess;
using Dapper;

namespace Dialogs.DataAccess.Migrations;

public class MessagesMigration : IMigration
{
    private readonly IOtusContextFactory _factory = new OtusContextFactory();

    public MessagesMigration()
    {
        MigrationId = Guid.Parse("1c77a255-4545-4b95-8b60-e5cb12b05077");
    }

    public override void Migrate(string connectionString)
    {
        var exists = _factory.Get(connectionString).Query<int>(conn =>
        {
            return conn.QueryFirst<int>($"select count(*) from \"Migrations\" where id = '{MigrationId}'");
        }) > 0;

        if (exists) return;

        _factory.Get(connectionString).Execute(conn => conn.Execute("DROP TABLE IF EXISTS messages;"));
        _factory.Get(connectionString).Execute(conn =>
            conn.Execute(
                @"CREATE EXTENSION IF NOT EXISTS ""uuid-ossp"";
                  CREATE TABLE messages (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),from_user_id UUID NOT NULL,to_user_id UUID NOT NULL,text TEXT NOT NULL,sent_at TIMESTAMP NOT NULL DEFAULT NOW(),shard_key UUID NOT NULL);"));
        _factory.Get(connectionString).Execute(conn =>
            conn.Execute(
                @"CREATE INDEX idx_messages_users ON messages (from_user_id, to_user_id);
                  CREATE INDEX idx_messages_shard_key ON messages (shard_key);
                  CREATE INDEX idx_messages_from_user ON messages (from_user_id);
                  CREATE INDEX idx_messages_to_user ON messages (to_user_id);
                  CREATE INDEX idx_messages_sent_at ON messages (sent_at);"));
        _factory.Get(connectionString).Execute(conn => conn.Execute($"insert into \"Migrations\" (id) values ('{MigrationId}');"));
    }
}
