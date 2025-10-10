using Counter.Application.Repositories;
using Counter.Entities;

namespace Counter.Application.Services;

public interface ISagaService
{
    Task<MessageReadSaga?> GetByIdAsync(Guid sagaId);
    Task<IEnumerable<MessageReadSaga>> GetByStateAsync(SagaState state);
    Task<bool> CreateAsync(MessageReadSaga saga);
    Task<bool> UpdateAsync(MessageReadSaga saga);
    Task<bool> DeleteAsync(Guid sagaId);
    Task<bool> ExistsAsync(Guid sagaId);
    Task<IEnumerable<MessageReadSaga>> GetOlderThanAsync(DateTime threshold, SagaState state);
}

public class SagaService : ISagaService
{
    private readonly ISagaRepository _sagaRepository;

    public SagaService(ISagaRepository sagaRepository)
    {
        _sagaRepository = sagaRepository;
    }

    public  Task<MessageReadSaga?> GetByIdAsync(Guid sagaId)
    {
        return _sagaRepository.GetByIdAsync(sagaId);
    }

    public  Task<IEnumerable<MessageReadSaga>> GetByStateAsync(SagaState state)
    {
        return _sagaRepository.GetByStateAsync(state);
    }

    public  Task<bool> CreateAsync(MessageReadSaga saga)
    {
        return _sagaRepository.CreateAsync(saga);
    }

    public  Task<bool> UpdateAsync(MessageReadSaga saga)
    {
        return _sagaRepository.UpdateAsync(saga);
    }

    public  Task<bool> DeleteAsync(Guid sagaId)
    {
        return _sagaRepository.DeleteAsync(sagaId);
    }

    public  Task<bool> ExistsAsync(Guid sagaId)
    {
        return _sagaRepository.ExistsAsync(sagaId);
    }

    public  Task<IEnumerable<MessageReadSaga>> GetOlderThanAsync(DateTime threshold, SagaState state)
    {
        return _sagaRepository.GetOlderThanAsync(threshold, state);
    }
}
