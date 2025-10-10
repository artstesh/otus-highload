using System.Text.Json.Serialization;
using Common.DataAccess;

namespace Counter.Entities;

public class UserCounter : IEntity<Guid>
{
    [JsonPropertyName("user_id")]
    public Guid Id { get; set; }
    [JsonPropertyName("unread_messages_count")]
    public int UnreadMessagesCount { get; set; }
    [JsonPropertyName("last_updated")]
    public DateTime LastUpdated { get; set; }
}
