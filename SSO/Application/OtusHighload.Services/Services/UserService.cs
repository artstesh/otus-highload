using System.Diagnostics;
using Common.Utility;
using OtusHighload.Application.Repositories;
using OtusHighload.Contracts.DTO;
using OtusHighload.Entities;

namespace OtusHighload.Application.Services;

public interface IUserService
{
    Task<List<AppUser>> List(CancellationToken ct);
    Task<List<AppUser>> SearchByName(string search, CancellationToken ct);
    Task<AppUser?> Get(Guid id, CancellationToken ct);
    Task<bool> CheckPassword(Guid id, string password, CancellationToken ct);
    Task<Guid?> CreateUser(AppUserCreateDto appUser, CancellationToken ct);
    Task<bool> Update(AppUser appUser, CancellationToken ct);

    public Task<bool> CreateRandomUsers(CancellationToken ct, int count = 1000000);
}

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    private string[] userKeys = new[]
    {
        "FirstName",
        "LastName",
        "BirthDate",
        "Male",
        "Hobby",
        "City",
        "PasswordHash"
    };

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<List<AppUser>> List(CancellationToken ct)
    {
        return (await _userRepository.ListAsync(ct)).ToList();
    }

    public async Task<List<AppUser>> SearchByName(string search, CancellationToken ct)
    {
        return (await _userRepository.SelectLikeAsync(new[] { "FirstName", "LastName" },
            new { FirstName = $"%{search}%", LastName = $"%{search}%" }, ct)).ToList();
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
        appUser.PasswordHash = Md5Hasher.Hash(appUser.Password);
        return await _userRepository.CreateAsync(userKeys, appUser, ct);
    }

    public async Task<bool> Update(AppUser appUser, CancellationToken ct)
    {
        return (await _userRepository.UpdateAsync(userKeys, appUser, ct)) > 0;
    }

    public async Task<bool> CreateRandomUsers(CancellationToken ct, int count = 10000)
    {
        List<AppUser> users = new List<AppUser>();
        for (var i = 0; i < count; i++)
        {
            var male = Faker.BooleanFaker.Boolean();
            users.Add(new AppUser
            {
                Id = Guid.NewGuid(),
                FirstName = NameRandomizer.RandomizeName(male ? Faker.NameFaker.MaleFirstName() : Faker.NameFaker.FemaleFirstName()),
                LastName = NameRandomizer.RandomizeName(male ? Faker.NameFaker.MaleFirstName() : Faker.NameFaker.FemaleFirstName()),
                City = Faker.LocationFaker.City(),
                Male = male,
                BirthDate = Faker.DateTimeFaker.BirthDay(18, 75),
                PasswordHash = Md5Hasher.Hash("123456"),
                Hobby = HobbyGenerator.GetHobby()
            });
            if (users.Count >= 10000 || i >= count)
            {
                await _userRepository.BulkCreateAsync(userKeys, users.Cast<object>().ToList(), ct);
                users.Clear();
            }
        }

        return true;
    }


}
