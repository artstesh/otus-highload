using System.Text.Json.Serialization;

namespace Common.Contracts;

public class DefineRegionRequest
{
    [JsonPropertyName("wkt")]
    public string Wkt { get; set; }
}
