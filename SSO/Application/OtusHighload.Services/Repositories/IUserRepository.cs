using OtusHighload.Entities;
using Common.DataAccess;

namespace OtusHighload.Application.Repositories;

public interface IUserRepository : IRepository<AppUser,Guid>
{
}
