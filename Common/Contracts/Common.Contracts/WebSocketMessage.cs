using System.Text.Json.Serialization;

namespace Common.Contracts;

public class WebSocketMessage
{
    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("data")]
    public object Data { get; set; } = new();
}
