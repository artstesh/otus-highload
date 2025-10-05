using System.Text.Json.Serialization;
using Common.DataAccess;

namespace OtusHighload.Entities;

public class Post : IEntity<Guid>
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    [JsonPropertyName("text")]
    public string Text { get; set; }
    [JsonPropertyName("author_id")]
    public Guid AuthorId { get; set; }
    [JsonPropertyName("created_at")]
    public DateTime CreatedAt { get; set; }
}
