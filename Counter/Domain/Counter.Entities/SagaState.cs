namespace Counter.Entities;

public enum SagaState
{
    Pending,
    MessageMarkedAsRead,
    CounterDecremented,
    Completed,
    Compensating,
    Failed
}
