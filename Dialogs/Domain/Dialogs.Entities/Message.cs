using System.Text.Json.Serialization;

namespace Dialogs.Entities;

public class Message
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("from_user_id")]
    public string FromUserId { get; set; }

    [JsonPropertyName("to_user_id")]
    public string ToUserId { get; set; }

    [JsonPropertyName("text")]
    public string Text { get; set; }

    [JsonPropertyName("sent_at")]
    public long SentAt { get; set; }
}
