using System.Text.Json.Serialization;

namespace OtusHighload.Contracts.Models;

public class SignInModel
{
    [JsonPropertyName("id")]
    public required Guid UserId { get; set; }
    [JsonPropertyName("password")]
    public required string Password { get; set; }
}
