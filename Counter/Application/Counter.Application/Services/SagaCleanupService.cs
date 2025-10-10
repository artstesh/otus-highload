

// Saga.Infrastructure/Services/SagaCleanupService.cs

using Counter.Application.Repositories;
using Counter.Entities;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Counter.Application.Services;

    public class SagaCleanupService : BackgroundService
    {
        private readonly ISagaRepository _sagaRepository;
        private readonly ILogger<SagaCleanupService> _logger;
        private readonly TimeSpan _cleanupInterval = TimeSpan.FromHours(1);
        private readonly TimeSpan _stalledThreshold = TimeSpan.FromDays(1);

        public SagaCleanupService(
            ISagaRepository sagaRepository,
            ILogger<SagaCleanupService> logger)
        {
            _sagaRepository = sagaRepository;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("SAGA Cleanup Service started");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await CleanupStalledSagasAsync();
                    await Task.Delay(_cleanupInterval, stoppingToken);
                }
                catch (Exception ex) when (ex is not OperationCanceledException)
                {
                    _logger.LogError(ex, "Error during SAGA cleanup");
                    await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
                }
            }

            _logger.LogInformation("SAGA Cleanup Service stopped");
        }

        private async Task CleanupStalledSagasAsync()
        {
            var threshold = DateTime.UtcNow.Subtract(_stalledThreshold);

            // Находим SAGA, которые зависли в промежуточных состояниях
            var stalledStates = new[]
            {
                SagaState.Pending,
                SagaState.MessageMarkedAsRead,
                SagaState.CounterDecremented,
                SagaState.Compensating
            };

            foreach (var state in stalledStates)
            {
                var stalledSagas = await _sagaRepository.GetOlderThanAsync(threshold, state);

                foreach (var saga in stalledSagas)
                {
                    _logger.LogWarning(
                        "Found stalled SAGA {SagaId} in state {State} created at {CreatedAt}. Marking as failed.",
                        saga.Id, saga.State, saga.CreatedAt);

                    saga.State = SagaState.Failed;
                    saga.FailureReason = $"Auto-failed: Stalled in state {saga.State} for more than {_stalledThreshold}";
                    saga.CompletedAt = DateTime.UtcNow;

                    await _sagaRepository.UpdateAsync(saga);
                }
            }

            _logger.LogInformation("SAGA cleanup completed");
        }

}
