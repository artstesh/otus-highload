using Counter.Entities;

namespace Counter.Application.Repositories;

public interface ISagaRepository
{
    Task<MessageReadSaga?> GetByIdAsync(Guid sagaId);
    Task<IEnumerable<MessageReadSaga>> GetByStateAsync(SagaState state);
    Task<bool> CreateAsync(MessageReadSaga saga);
    Task<bool> UpdateAsync(MessageReadSaga saga);
    Task<bool> DeleteAsync(Guid sagaId);
    Task<bool> ExistsAsync(Guid sagaId);
    Task<IEnumerable<MessageReadSaga>> GetOlderThanAsync(DateTime threshold, SagaState state);
}
