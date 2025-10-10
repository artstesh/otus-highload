namespace Dialogs.Entities;

public class Message
{
    public Guid Id { get; set; }
    public Guid FromUserId { get; set; }
    public Guid ToUserId { get; set; }
    public string Text { get; set; }
    public DateTime SentAt { get; set; }
    public bool IsRead { get; set; }
}
