using Common.DataAccess;
using Counter.Application.Repositories;
using Counter.Entities;
using Dapper;

namespace Counter.DataAccess.Repositories;

public class CounterRepository:  Repository<UserCounter,Guid>,ICounterRepository
{
    private readonly IOtusContextFactory _factory;

    public CounterRepository(IOtusContextFactory factory) : base(factory, "counters")
    {
        _factory = factory;
    }

    public async Task<UserCounter?> GetByUserIdAsync(Guid userId)
    {
        const string sql = @"
            SELECT user_id as Id, unread_count as UnreadMessagesCount, last_updated as LastUpdated
            FROM counters
            WHERE user_id = @UserId";

        var queryArgs = new { UserId = userId };
        return await _factory.Get().QueryAsync<UserCounter?>(f =>
        {
            return f.QueryFirstOrDefaultAsync<UserCounter?>(sql,queryArgs);
        });
    }

    public async Task<bool> IncrementAsync(Guid userId)
    {
        const string sql = @"
            INSERT INTO counters (user_id, unread_count, last_updated)
            VALUES (@UserId, 1, NOW())
            ON CONFLICT (user_id)
            DO UPDATE SET
                unread_count = counters.unread_count + 1,
                last_updated = NOW()
            RETURNING user_id";

        var queryArgs = new { UserId = userId };
        var result = await _factory.Get().QueryAsync<Guid?>(f =>
        {
            return f.ExecuteScalarAsync<Guid?>(sql,queryArgs);
        });
        return result.HasValue;
    }

    public async Task<bool> DecrementAsync(Guid userId)
    {
        const string sql = @"
            UPDATE counters
            SET unread_count = GREATEST(0, unread_count - 1),
                last_updated = NOW()
            WHERE user_id = @UserId
            RETURNING user_id";

        var queryArgs = new { UserId = userId };
        var result = await _factory.Get().QueryAsync<Guid?>(f =>
        {
            return f.ExecuteScalarAsync<Guid?>(sql,queryArgs);
        });
        return result.HasValue;
    }
}
