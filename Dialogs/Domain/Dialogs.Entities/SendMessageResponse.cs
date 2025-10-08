using System.Text.Json.Serialization;

namespace Dialogs.Entities;

public class SendMessageResponse
{
    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("message_id")]
    public string MessageId { get; set; }

    [JsonPropertyName("error")]
    public string Error { get; set; }
}
