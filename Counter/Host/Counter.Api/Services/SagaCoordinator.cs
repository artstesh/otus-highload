using Counter.Entities;

namespace Counter.Api.Services;

public interface ISagaCoordinator
{
    Task<Guid> StartMarkMessageReadSagaAsync(Guid messageId, Guid userId);
    Task<bool> CompleteMarkMessageReadStepAsync(Guid sagaId);
    Task<bool> CompleteDecrementCounterStepAsync(Guid sagaId);
    Task<bool> CompensateAsync(Guid sagaId, string reason);
}

// Saga.Core/Services/SagaCoordinator.cs
public class SagaCoordinator : ISagaCoordinator
{
    private readonly ISagaRepository _sagaRepository;
    private readonly IMessageServiceClient _messageService;
    private readonly ICounterService _counterService;
    private readonly ILogger<SagaCoordinator> _logger;

    public SagaCoordinator(
        ISagaRepository sagaRepository,
        IMessageServiceClient messageService,
        ICounterService counterService,
        ILogger<SagaCoordinator> logger)
    {
        _sagaRepository = sagaRepository;
        _messageService = messageService;
        _counterService = counterService;
        _logger = logger;
    }

    public async Task<Guid> StartMarkMessageReadSagaAsync(Guid messageId, Guid userId)
    {
        var saga = new MessageReadSaga
        {
            MessageId = messageId,
            UserId = userId
        };

        await _sagaRepository.CreateAsync(saga);
        _logger.LogInformation("Started SAGA {SagaId} for message {MessageId}", saga.SagaId, messageId);

        // Шаг 1: Пометить сообщение как прочитанное
        await ExecuteMarkMessageReadStepAsync(saga);

        return saga.SagaId;
    }

    private async Task ExecuteMarkMessageReadStepAsync(MessageReadSaga saga)
    {
        try
        {
            var success = await _messageService.MarkMessageAsReadAsync(saga.MessageId);
            if (success)
            {
                saga.State = SagaState.MessageMarkedAsRead;
                await _sagaRepository.UpdateAsync(saga);

                _logger.LogInformation("SAGA {SagaId}: Message marked as read", saga.SagaId);

                // Шаг 2: Уменьшить счетчик
                await ExecuteDecrementCounterStepAsync(saga);
            }
            else
            {
                await CompensateAsync(saga.SagaId, "Failed to mark message as read");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SAGA {SagaId}: Error marking message as read", saga.SagaId);
            await CompensateAsync(saga.SagaId, $"Mark message failed: {ex.Message}");
        }
    }

    private async Task ExecuteDecrementCounterStepAsync(MessageReadSaga saga)
    {
        try
        {
            var success = await _counterService.DecrementUnreadCountAsync(saga.UserId);
            if (success)
            {
                saga.State = SagaState.Completed;
                saga.CompletedAt = DateTime.UtcNow;
                await _sagaRepository.UpdateAsync(saga);

                _logger.LogInformation("SAGA {SagaId}: Completed successfully", saga.SagaId);
            }
            else
            {
                // Компенсирующая транзакция: помечаем сообщение как непрочитанное
                await CompensateAsync(saga.SagaId, "Failed to decrement counter");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SAGA {SagaId}: Error decrementing counter", saga.SagaId);
            await CompensateAsync(saga.SagaId, $"Decrement counter failed: {ex.Message}");
        }
    }

    public async Task<bool> CompensateAsync(Guid sagaId, string reason)
    {
        var saga = await _sagaRepository.GetByIdAsync(sagaId);
        if (saga == null) return false;

        saga.State = SagaState.Compensating;
        saga.FailureReason = reason;
        await _sagaRepository.UpdateAsync(saga);

        _logger.LogWarning("SAGA {SagaId}: Starting compensation - {Reason}", sagaId, reason);

        try
        {
            // Компенсируем только если сообщение было помечено как прочитанное
            if (saga.State == SagaState.MessageMarkedAsRead)
            {
                await _messageService.MarkMessageAsUnreadAsync(saga.MessageId);
                _logger.LogInformation("SAGA {SagaId}: Compensation completed - message marked as unread", sagaId);
            }

            saga.State = SagaState.Failed;
            await _sagaRepository.UpdateAsync(saga);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SAGA {SagaId}: Compensation failed", sagaId);
            return false;
        }
    }
}
