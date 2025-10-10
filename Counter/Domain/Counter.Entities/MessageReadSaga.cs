using Common.DataAccess;

namespace Counter.Entities;

public class MessageReadSaga : IEntity<Guid>
{
    public Guid Id { get; set; }
    public Guid MessageId { get; set; }
    public Guid UserId { get; set; }
    public SagaState State { get; set; } = SagaState.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    public string? FailureReason { get; set; }
}
