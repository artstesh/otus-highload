using Counter.Entities;

namespace Counter.Application.Repositories;

public interface ICounterRepository
{
    Task<UserCounter?> GetByUserIdAsync(Guid userId);
    Task<bool> IncrementAsync(Guid userId);
    Task<bool> DecrementAsync(Guid userId);
}
