using Common.DataAccess;
using Dapper;

namespace OtusHighload.DataAccess.Migrations;

public class PostsMigration: IMigration
{
    private readonly IOtusContextFactory _factory;

    public PostsMigration(IOtusContextFactory factory)
    {
        _factory = factory;
        MigrationId = Guid.Parse("1c77a255-4545-4b95-8b60-e5cb12b05074");
    }

    public override void Migrate()
    {
        var exists = _factory.Get().Query<int>(conn =>
        {
            return conn.QueryFirst<int>($"select count(*) from \"Migrations\" where id = '{MigrationId}'");
        }) > 0;
        if (exists) return;
        _factory.Get().Execute(conn => conn.Execute("DROP TABLE IF EXISTS posts;"));
        _factory.Get().Execute(conn => conn.Execute("DROP TABLE IF EXISTS friendships;"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                $"create table posts(\"Id\" uuid default gen_random_uuid() not null,\"Text\" text not null,\"AuthorId\" uuid not null,\"CreatedAt\" TIMESTAMP DEFAULT NOW());"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                $"CREATE TABLE friendships (\"Id\" uuid default gen_random_uuid() not null,\"UserId\" uuid NOT NULL,\"FriendId\" uuid NOT NULL,\"CreatedAt\" TIMESTAMP DEFAULT NOW(),UNIQUE(\"UserId\", \"FriendId\"));"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                $"CREATE INDEX idx_posts_author_id ON posts(\"AuthorId\");"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                $"CREATE INDEX idx_posts_created_at ON posts(\"CreatedAt\" DESC);"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                $"CREATE INDEX idx_friendships_user_id ON friendships(\"UserId\");"));
        _factory.Get().Execute(conn =>
            conn.Execute(
                $"CREATE INDEX idx_friendships_friend_id ON friendships(\"FriendId\");"));
        _factory.Get().Execute(conn => conn.Execute($"insert into \"Migrations\" (id) values ('{MigrationId}');"));
    }
}
