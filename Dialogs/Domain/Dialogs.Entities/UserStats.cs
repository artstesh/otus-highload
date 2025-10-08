using System.Text.Json.Serialization;

namespace Dialogs.Entities;

public class UserStats
{
    [JsonPropertyName("user_id")]
    public string UserId { get; set; }

    [JsonPropertyName("sent_count")]
    public int SentCount { get; set; }

    [JsonPropertyName("received_count")]
    public int ReceivedCount { get; set; }

    [JsonPropertyName("total_count")]
    public int TotalCount { get; set; }
}
