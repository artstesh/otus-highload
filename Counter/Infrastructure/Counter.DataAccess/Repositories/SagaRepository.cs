using Common.DataAccess;
using Counter.Application.Repositories;
using Counter.Entities;
using Dapper;

namespace Counter.DataAccess.Repositories;

public class SagaRepository : Repository<MessageReadSaga, Guid>, ISagaRepository
{
    private readonly IOtusContextFactory _factory;

    public SagaRepository(IOtusContextFactory factory) : base(factory, "sagas")
    {
        _factory = factory;
    }

    public async Task<MessageReadSaga?> GetByIdAsync(Guid sagaId)
    {
        const string sql = @"
                SELECT
                    id as Id,
                    message_id as MessageId,
                    user_id as UserId,
                    state as State,
                    created_at as CreatedAt,
                    completed_at as CompletedAt,
                    failure_reason as FailureReason
                FROM sagas
                WHERE id = @SagaId";
        var queryArgs = new { SagaId = sagaId };
        return await _factory.Get().QueryAsync<MessageReadSaga?>(f =>
        {
            return f.QueryFirstOrDefaultAsync<MessageReadSaga?>(sql, queryArgs);
        });
    }

    public async Task<IEnumerable<MessageReadSaga>> GetByStateAsync(SagaState state)
    {
        const string sql = @"
                SELECT
                    id as Id,
                    message_id as MessageId,
                    user_id as UserId,
                    state as State,
                    created_at as CreatedAt,
                    completed_at as CompletedAt,
                    failure_reason as FailureReason
                FROM sagas
                WHERE state = @State
                ORDER BY created_at DESC";

        var queryArgs = new { State = (int)state };
        return await _factory.Get().QueryAsync<IEnumerable<MessageReadSaga>>(f =>
        {
            return f.QueryAsync<MessageReadSaga>(sql, queryArgs);
        });
    }

    public async Task<bool> CreateAsync(MessageReadSaga saga)
    {
        const string sql = @"
                INSERT INTO sagas
                    (id, message_id, user_id, state, created_at, completed_at, failure_reason)
                VALUES
                    (@SagaId, @MessageId, @UserId, @State, @CreatedAt, @CompletedAt, @FailureReason)";

        var queryArgs = new
        {
            SagaId= saga.Id,
            MessageId= saga.MessageId,
            UserId=saga.UserId,
            State = (int)saga.State,
            CreatedAt=saga.CreatedAt,
            CompletedAt=saga.CompletedAt,
            FailureReason=saga.FailureReason
        };
        var affectedRows = await _factory.Get().QueryAsync<int>(f => { return f.ExecuteAsync(sql, queryArgs); });
        return affectedRows > 0;
    }

    public async Task<bool> UpdateAsync(MessageReadSaga saga)
    {
        const string sql = @"
                UPDATE sagas
                SET
                    message_id = @MessageId,
                    user_id = @UserId,
                    state = @State,
                    created_at = @CreatedAt,
                    completed_at = @CompletedAt,
                    failure_reason = @FailureReason
                WHERE id = @SagaId";

        var queryArgs = new
        {
            SagaId= saga.Id,
            MessageId= saga.MessageId,
            UserId=saga.UserId,
            State = (int)saga.State,
            CreatedAt=saga.CreatedAt,
            CompletedAt=saga.CompletedAt,
            FailureReason=saga.FailureReason
        };

        var affectedRows = await _factory.Get().QueryAsync<int>(f => { return f.ExecuteAsync(sql, queryArgs); });
        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(Guid sagaId)
    {
        const string sql = "DELETE FROM sagas WHERE id = @SagaId";

        var queryArgs = new { SagaId = sagaId };

        var affectedRows = await _factory.Get().QueryAsync<int>(f => { return f.ExecuteAsync(sql, queryArgs); });
        return affectedRows > 0;
    }

    public async Task<bool> ExistsAsync(Guid sagaId)
    {
        const string sql = "SELECT COUNT(1) FROM sagas WHERE id = @SagaId";

        var queryArgs = new { SagaId = sagaId };

        var affectedRows = await _factory.Get().QueryAsync<int>(f => { return f.ExecuteAsync(sql, queryArgs); });
        return affectedRows > 0;
    }

    public async Task<IEnumerable<MessageReadSaga>> GetOlderThanAsync(DateTime threshold, SagaState state)
    {
        const string sql = @"
                SELECT
                    id as Id,
                    message_id as MessageId,
                    user_id as UserId,
                    state as State,
                    created_at as CreatedAt,
                    completed_at as CompletedAt,
                    failure_reason as FailureReason
                FROM sagas
                WHERE state = @State AND created_at < @Threshold
                ORDER BY created_at ASC";


        var queryArgs = new
        {
            State = (int)state,
            Threshold = threshold
        };
        return await _factory.Get().QueryAsync<IEnumerable<MessageReadSaga>>(f =>
        {
            return f.QueryAsync<MessageReadSaga>(sql, queryArgs);
        });
    }
}
