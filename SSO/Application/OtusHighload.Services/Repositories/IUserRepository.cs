using OtusHighload.Entities;
using UZ.DataAccess;

namespace OtusHighload.Application.Repositories;

public interface IUserRepository : IRepository<AppUser,Guid>
{
}
