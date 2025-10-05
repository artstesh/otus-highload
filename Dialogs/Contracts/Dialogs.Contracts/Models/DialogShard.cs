namespace Dialogs.Contracts.Models;

public class DialogShard
{
    public int ShardId { get; set; }
    public string ConnectionString { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; }
    public int Weight { get; set; } = 1;
}
