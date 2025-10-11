using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;

namespace OtusHighload.Application.Services;

public interface IMessageBusService
{
    Task PublishPostCreatedAsync(Guid userId, CancellationToken tkn);
}

public class RabbitMQService : IMessageBusService, IDisposable
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly ILogger<RabbitMQService> _logger;
    private const string ExchangeName = "counter_events";
    private const string QueueName = "counter_notifications";
    private const string RoutingKey = "message.send";

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

    public async Task PublishPostCreatedAsync(Guid userId, CancellationToken tkn)
    {
        try
        {
            var message = JsonSerializer.Serialize(userId);
            var body = Encoding.UTF8.GetBytes(message);

            var properties = _channel.CreateBasicProperties();
            properties.Persistent = true;

            _channel.BasicPublish(
                exchange: ExchangeName,
                routingKey: RoutingKey,
                basicProperties: properties,
                body: body);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error publishing message created event");
            throw;
        }
    }

    public void Dispose()
    {
        _channel?.Close();
        _connection?.Close();
    }
}
