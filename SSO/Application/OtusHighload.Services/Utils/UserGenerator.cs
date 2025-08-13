using Common.Utility;
using OtusHighload.Application.Services;
using OtusHighload.Entities;

namespace OtusHighload.Application.Utils;

public static class UserGenerator
{
    public static AppUser GenerateUser()
    {
        var male = Faker.BooleanFaker.Boolean();
        return new AppUser
        {
            Id = Guid.NewGuid(),
            FirstName = NameRandomizer.RandomizeName(male
                ? Faker.NameFaker.MaleFirstName()
                : Faker.NameFaker.FemaleFirstName()),
            LastName = NameRandomizer.RandomizeName(male
                ? Faker.NameFaker.MaleFirstName()
                : Faker.NameFaker.FemaleFirstName()),
            City = Faker.LocationFaker.City(),
            Male = male,
            BirthDate = Faker.DateTimeFaker.BirthDay(18, 75),
            PasswordHash = Md5Hasher.Hash("123456"),
            Hobby = HobbyGenerator.GetHobby()
        };
    }
}
