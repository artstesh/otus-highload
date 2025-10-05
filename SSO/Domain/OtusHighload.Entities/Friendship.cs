using System.Text.Json.Serialization;
using Common.DataAccess;

namespace OtusHighload.Entities;

public class Friendship: IEntity<Guid>
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    [JsonPropertyName("user_id")]
    public Guid UserId { get; set; }
    [JsonPropertyName("friend_id")]
    public Guid FriendId { get; set; }
    [JsonPropertyName("created_at")]
    public DateTime CreatedAt { get; set; }
}
