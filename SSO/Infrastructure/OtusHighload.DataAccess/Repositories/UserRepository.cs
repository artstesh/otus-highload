using OtusHighload.Application.Repositories;
using OtusHighload.Entities;
using Common.DataAccess;
using Common.DataAccess;

namespace OtusHighload.DataAccess;

public class UserRepository : Repository<AppUser,Guid>, IUserRepository
{
    public UserRepository(IOtusContextFactory factory) : base(factory, "users")
    {
    }
}
