using Common.Utility;
using OtusHighload.Application.Repositories;
using OtusHighload.Contracts.DTO;
using OtusHighload.Entities;

namespace OtusHighload.Application.Services;

public interface IUserService
{
    Task<List<AppUser>> List(CancellationToken ct);
    Task<AppUser?> Get(Guid id, CancellationToken ct);
    Task<bool> CheckPassword(Guid id, string password, CancellationToken ct);
    Task<Guid?> CreateUser(AppUserCreateDto appUser, CancellationToken ct);
    Task<bool> Update(AppUser appUser, CancellationToken ct);
}

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<List<AppUser>> List(CancellationToken ct)
    {
        return (await _userRepository.ListAsync(ct)).ToList();
    }

    public async Task<AppUser?> Get(Guid id, CancellationToken ct)
    {
        return await _userRepository.GetAsync(id, ct);
    }

    public async Task<bool> CheckPassword(Guid id, string password, CancellationToken ct)
    {
        var keys = new[]
        {
            "Id",
            "PasswordHash"
        };
        var item = new
        {
            Id = id,
            PasswordHash = Md5Hasher.Hash(password),
        };
        return (await _userRepository.ListWhereAsync(keys, item, ct)).Any();
    }

    public async Task<Guid?> CreateUser(AppUserCreateDto appUser, CancellationToken ct)
    {
        var keys = new[]
        {
            "FirstName",
            "LastName",
            "BirthDate",
            "Male",
            "Hobby",
            "City",
            "PasswordHash"
        };
        appUser.PasswordHash = Md5Hasher.Hash(appUser.Password);
        return await _userRepository.CreateAsync(keys, appUser, ct);
    }

    public async Task<bool> Update(AppUser appUser, CancellationToken ct)
    {
        var keys = new[]
        {
            "Id",
            "FirstName",
            "LastName",
            "BirthDate",
            "Male",
            "Hobby",
            "City"
        };
        return (await _userRepository.UpdateAsync(keys, appUser, ct)) > 0;
    }
}
