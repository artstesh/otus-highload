using PostSocket.AppServices.Services;

namespace PostSocket.Daemon.Workers;

public class RabbitMQBackgroundService : BackgroundService
{
    private readonly IMessageBusService _messageBusService;
    private readonly ILogger<RabbitMQBackgroundService> _logger;

    public RabbitMQBackgroundService(
        IMessageBusService messageBusService,
        ILogger<RabbitMQBackgroundService> logger)
    {
        _messageBusService = messageBusService;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("RabbitMQ Background Service started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await _messageBusService.SubscribeToPostEventsAsync(stoppingToken);

                await Task.Delay(Timeout.Infinite, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in RabbitMQ background service. Restarting in 5 seconds...");
                await Task.Delay(5000, stoppingToken);
            }
        }

        _logger.LogInformation("RabbitMQ Background Service stopped");
    }
}
