using System.Text.Json.Serialization;
using Common.DataAccess;

namespace OtusHighload.Entities;

public class AppUser : IEntity<Guid>
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    [JsonPropertyName("first_name")]
    public required string FirstName { get; set; }
    [JsonPropertyName("last_name")]
    public required string LastName { get; set; }
    [JsonPropertyName("birthdate")]
    public required DateTime BirthDate { get; set; }
    [JsonPropertyName("male")]
    public required bool Male { get; set; }
    [JsonPropertyName("hobby")]
    public required string Hobby { get; set; }
    [JsonPropertyName("city")]
    public required string City { get; set; }
    [JsonIgnore]
    public string PasswordHash { get; set; }
}
