namespace Fields.Contracts.Models;

public class SendMessageRequest
{
    public Guid ToUserId { get; set; }
    public string Text { get; set; }
}
