using UZ.DataAccess;

namespace OtusHighload.Entities;

public class AppUser : IEntity<Guid>
{
    public Guid Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required DateTime BirthDate { get; set; }
    public required bool Male { get; set; }
    public required string Hobby { get; set; }
    public required string City { get; set; }
    public required string PasswordHash { get; set; }
}
