using System.Text.Json.Serialization;

namespace Common.Contracts;

public class FieldCreatedEvent
{
    [JsonPropertyName("fieldId")]
    public Guid Id { get; set; }

    [JsonPropertyName("wkt")]
    public string Wkt { get; set; } = string.Empty;
    [JsonPropertyName("regionId")]
    public required Guid RegionId { get; set; }
}
