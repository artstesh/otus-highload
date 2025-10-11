using Counter.Application.Services;
using Counter.Entities;

namespace Counter.Api.Services;

public interface ISagaCoordinator
{
    Task<Guid?> StartMarkMessageReadSagaAsync(Guid messageId, Guid userId, CancellationToken tkn);
}

public class SagaCoordinator : ISagaCoordinator
{
    private readonly ISagaService _service;
    private readonly IMessageServiceClient _messageService;
    private readonly ICounterService _counterService;
    private readonly ILogger<SagaCoordinator> _logger;

    public SagaCoordinator(
        ISagaService service,
        IMessageServiceClient messageService,
        ICounterService counterService,
        ILogger<SagaCoordinator> logger)
    {
        _service = service;
        _messageService = messageService;
        _counterService = counterService;
        _logger = logger;
    }

    public async Task<Guid?> StartMarkMessageReadSagaAsync(Guid messageId, Guid userId, CancellationToken tkn)
    {
        var saga = new MessageReadSaga
        {
            Id = Guid.NewGuid(),
            MessageId = messageId,
            UserId = userId
        };

        var created = await _service.CreateAsync(saga);
        if (!created) return null;
        _logger.LogInformation("Started SAGA {SagaId} for message {MessageId}", saga.Id, messageId);

        var fulfilled = await ExecuteMarkMessageReadStepAsync(saga, tkn);

        return fulfilled ? saga.Id : null;
    }

    private async Task<bool> ExecuteMarkMessageReadStepAsync(MessageReadSaga saga, CancellationToken tkn)
    {
        try
        {
            var success = await _messageService.MarkMessageAsReadAsync(saga.MessageId, saga.UserId);
            if (success)
            {
                saga.State = SagaState.MessageMarkedAsRead;
                await _service.UpdateAsync(saga);

                _logger.LogInformation("SAGA {SagaId}: Message marked as read", saga.Id);

                return await ExecuteDecrementCounterStepAsync(saga, tkn);
            }
            else
            {
                await CompensateAsync(saga.Id, "Failed to mark message as read");
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SAGA {Id}: Error marking message as read", saga.Id);
            await CompensateAsync(saga.Id, $"Mark message failed: {ex.StackTrace}");
        }

        return false;
    }

    private async Task<bool> ExecuteDecrementCounterStepAsync(MessageReadSaga saga, CancellationToken tkn)
    {
        try
        {
            var success = await _counterService.DecrementUnreadCountAsync(saga.UserId, tkn);
            if (success)
            {
                saga.State = SagaState.Completed;
                saga.CompletedAt = DateTime.UtcNow;
                await _service.UpdateAsync(saga);

                _logger.LogInformation("SAGA {Id}: Completed successfully", saga.Id);
                return true;
            }
            else
            {
                // Компенсирующая транзакция: помечаем сообщение как непрочитанное
                await CompensateAsync(saga.Id, "Failed to decrement counter");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SAGA {Id}: Error decrementing counter", saga.Id);
            await CompensateAsync(saga.Id, $"Decrement counter failed: {ex.Message}");
        }

        return false;
    }

    public async Task<bool> CompensateAsync(Guid sagaId, string reason)
    {
        var saga = await _service.GetByIdAsync(sagaId);
        if (saga == null) return false;

        saga.State = SagaState.Compensating;
        saga.FailureReason = reason;
        await _service.UpdateAsync(saga);

        _logger.LogWarning("SAGA {Id}: Starting compensation - {Reason}", sagaId, reason);

        try
        {
            var success = false;
            // Компенсируем только если сообщение было помечено как прочитанное
            if (saga.State == SagaState.MessageMarkedAsRead)
            {
                success = await _messageService.MarkMessageAsUnreadAsync(saga.MessageId, saga.UserId);
                _logger.LogInformation("SAGA {Id}: Compensation completed - message marked as unread", sagaId);
            }

            saga.State = SagaState.Failed;
            success = success && await _service.UpdateAsync(saga);

            return success;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SAGA {Id}: Compensation failed", sagaId);
            return false;
        }
    }
}
