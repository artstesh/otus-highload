using System.Text;
using System.Text.Json;
using Common.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;

namespace Fields.Application.Services;

public interface IMessageBusService
{
    Task PublishPostCreatedAsync(FieldCreatedEvent postEvent, CancellationToken tkn);
}

public class RabbitMQService : IMessageBusService, IDisposable
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly ILogger<RabbitMQService> _logger;
    private const string ExchangeName = "field_events";
    private const string QueueName = "websocket_notifications";
    private const string RoutingKey = "field.created";

    public RabbitMQService(IConfiguration configuration, ILogger<RabbitMQService> logger)
    {
        _logger = logger;

        var factory = new ConnectionFactory()
        {
            HostName = configuration["RabbitMQ:HostName"],
            UserName = configuration["RabbitMQ:UserName"],
            Password = configuration["RabbitMQ:Password"],
            VirtualHost = configuration["RabbitMQ:VirtualHost"]
        };

        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();

        _channel.ExchangeDeclare(ExchangeName, ExchangeType.Direct, durable: true);
        _channel.QueueDeclare(QueueName, durable: true, exclusive: false, autoDelete: false);
        _channel.QueueBind(QueueName, ExchangeName, routingKey: "");
    }

    public async Task PublishPostCreatedAsync(FieldCreatedEvent postEvent, CancellationToken tkn)
    {
        try
        {
            _logger.LogInformation($"Field created event processing");
            var message = JsonSerializer.Serialize(postEvent);
            var body = Encoding.UTF8.GetBytes(message);

            var properties = _channel.CreateBasicProperties();
            properties.Persistent = true;

            _channel.BasicPublish(
                exchange: ExchangeName,
                routingKey: RoutingKey,
                basicProperties: properties,
                body: body);

            _logger.LogInformation($"Field created event published");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error publishing post created event");
            throw;
        }
    }

    public void Dispose()
    {
        _channel?.Close();
        _connection?.Close();
    }
}
