namespace Dialogs.Contracts.Models;

public class SendMessageRequest
{
    public Guid FromUserId { get; set; }
    public Guid ToUserId { get; set; }
    public string Text { get; set; }
}
