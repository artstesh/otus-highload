using Common.DataAccess;
using Dapper;
using OtusHighload.Application.Repositories;
using OtusHighload.Entities;

namespace OtusHighload.DataAccess.Repositories;

public class UserRepository : Repository<AppUser,Guid>, IUserRepository
{
    public UserRepository(IOtusContextFactory factory) : base(factory, "users")
    {
    }

    public Task<IEnumerable<Guid>> ListIds(CancellationToken ct)
    {

        const string sql = @"SELECT ""Id"" FROM users";
        return _factory.Get().QueryAsync<IEnumerable<Guid>>(f => f.QueryAsync<Guid>(sql));
    }
}
