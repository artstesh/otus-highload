using System.Text.Json.Serialization;
using OtusHighload.Entities;

namespace OtusHighload.Contracts.DTO;

public class AppUserCreateDto : AppUser
{
    [JsonPropertyName("password")]
    public required string Password { get; set; }

    [JsonIgnore]
    public Guid Id { get; set; }
}
