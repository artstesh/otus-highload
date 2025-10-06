using System.Text.Json.Serialization;

namespace Common.Contracts;

public class PostCreatedEvent
{
    [JsonPropertyName("postId")]
    public Guid PostId { get; set; }

    [JsonPropertyName("postText")]
    public string Text { get; set; } = string.Empty;

    [JsonPropertyName("author_user_id")]
    public Guid AuthorId { get; set; }

    [JsonPropertyName("created_at")]
    public DateTime CreatedAt { get; set; }

    [JsonPropertyName("friend_ids")]
    public List<Guid> FriendIds { get; set; }
}
