using Common.DataAccess;
using Counter.Application.Repositories;
using Counter.Entities;
using Dapper;

namespace Counter.DataAccess.Repositories;

public class SagaRepository:  Repository<MessageReadSaga,Guid>,ISagaRepository
{
    private readonly IOtusContextFactory _factory;

    public SagaRepository(IOtusContextFactory factory) : base(factory, "message_saga")
    {
        _factory = factory;
    }

        public async Task<MessageReadSaga?> GetByIdAsync(Guid sagaId)
        {
            const string sql = @"
                SELECT
                    saga_id as SagaId,
                    message_id as MessageId,
                    user_id as UserId,
                    state as State,
                    created_at as CreatedAt,
                    completed_at as CompletedAt,
                    failure_reason as FailureReason
                FROM message_saga
                WHERE saga_id = @SagaId";
            var queryArgs = new { SagaId = sagaId };
            return await _factory.Get().QueryAsync<MessageReadSaga?>(f =>
            {
                return f.QueryFirstOrDefaultAsync<MessageReadSaga?>(sql,queryArgs);
            });
        }

        public async Task<IEnumerable<MessageReadSaga>> GetByStateAsync(SagaState state)
        {
            using var connection = _dbFactory.CreateConnection();

            const string sql = @"
                SELECT
                    saga_id as SagaId,
                    message_id as MessageId,
                    user_id as UserId,
                    state as State,
                    created_at as CreatedAt,
                    completed_at as CompletedAt,
                    failure_reason as FailureReason
                FROM message_saga
                WHERE state = @State
                ORDER BY created_at DESC";

            var queryArgs = new { State = (int)state };
            return await _factory.Get().QueryAsync<IEnumerable<MessageReadSaga>>(f =>
            {
                return f.QueryAsync<MessageReadSaga>(sql,queryArgs);
            });
        }

        public async Task<bool> CreateAsync(MessageReadSaga saga)
        {
            const string sql = @"
                INSERT INTO message_saga
                    (saga_id, message_id, user_id, state, created_at, completed_at, failure_reason)
                VALUES
                    (@SagaId, @MessageId, @UserId, @State, @CreatedAt, @CompletedAt, @FailureReason)";

            var queryArgs = new { saga.Id,
                saga.MessageId,
                saga.UserId,
                State = (int)saga.State,
                saga.CreatedAt,
                saga.CompletedAt,
                saga.FailureReason };
            var affectedRows = await _factory.Get().QueryAsync<int>(f =>
            {
                return f.ExecuteAsync(sql,queryArgs);
            });
            return affectedRows > 0;
        }

        public async Task<bool> UpdateAsync(MessageReadSaga saga)
        {
            using var connection = _dbFactory.CreateConnection();

            const string sql = @"
                UPDATE message_saga
                SET
                    message_id = @MessageId,
                    user_id = @UserId,
                    state = @State,
                    created_at = @CreatedAt,
                    completed_at = @CompletedAt,
                    failure_reason = @FailureReason
                WHERE saga_id = @SagaId";

            try
            {
                var affectedRows = await connection.ExecuteAsync(sql, new
                {
                    saga.SagaId,
                    saga.MessageId,
                    saga.UserId,
                    State = (int)saga.State,
                    saga.CreatedAt,
                    saga.CompletedAt,
                    saga.FailureReason
                });

                if (affectedRows > 0)
                {
                    _logger.LogDebug("Updated saga {SagaId} to state {State}", saga.SagaId, saga.State);
                }

                return affectedRows > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating saga {SagaId} in database", saga.SagaId);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(Guid sagaId)
        {
            using var connection = _dbFactory.CreateConnection();

            const string sql = "DELETE FROM message_saga WHERE saga_id = @SagaId";

            try
            {
                var affectedRows = await connection.ExecuteAsync(sql, new { SagaId = sagaId });

                if (affectedRows > 0)
                {
                    _logger.LogDebug("Deleted saga {SagaId} from database", sagaId);
                }

                return affectedRows > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting saga {SagaId} from database", sagaId);
                throw;
            }
        }

        public async Task<bool> ExistsAsync(Guid sagaId)
        {
            using var connection = _dbFactory.CreateConnection();

            const string sql = "SELECT COUNT(1) FROM message_saga WHERE saga_id = @SagaId";

            try
            {
                var count = await connection.ExecuteScalarAsync<int>(sql, new { SagaId = sagaId });
                return count > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking existence of saga {SagaId}", sagaId);
                throw;
            }
        }

        public async Task<IEnumerable<MessageReadSaga>> GetOlderThanAsync(DateTime threshold, SagaState state)
        {
            using var connection = _dbFactory.CreateConnection();

            const string sql = @"
                SELECT
                    saga_id as SagaId,
                    message_id as MessageId,
                    user_id as UserId,
                    state as State,
                    created_at as CreatedAt,
                    completed_at as CompletedAt,
                    failure_reason as FailureReason
                FROM message_saga
                WHERE state = @State AND created_at < @Threshold
                ORDER BY created_at ASC";

            try
            {
                var sagas = await connection.QueryAsync<MessageReadSaga>(sql, new
                {
                    State = (int)state,
                    Threshold = threshold
                });

                return sagas;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving old sagas created before {Threshold} with state {State}",
                    threshold, state);
                throw;
            }
        }
    }
}
