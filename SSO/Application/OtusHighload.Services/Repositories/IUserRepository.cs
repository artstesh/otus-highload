using OtusHighload.Entities;
using Common.DataAccess;

namespace OtusHighload.Application.Repositories;

public interface IUserRepository : IRepository<AppUser,Guid>
{
    Task<IEnumerable<Guid>> ListIds(CancellationToken ct);
}
