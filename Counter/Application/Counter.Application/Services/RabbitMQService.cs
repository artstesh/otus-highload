using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Counter.Application.Services;

public interface IMessageBusService
{
    Task SubscribeToEventsAsync(CancellationToken tkn);
}

public class RabbitMQService : IMessageBusService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly ILogger<RabbitMQService> _logger;
        private readonly ICounterService _counterService;

        private const string ExchangeName = "counter_events";
        private const string QueueName = "counter_notifications";
        private const string RoutingKey = "message.send";

        public RabbitMQService(
            IConfiguration configuration,
            ILogger<RabbitMQService> logger, ICounterService counterService)
        {
            _logger = logger;
            _counterService = counterService;

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
            _channel.QueueBind(QueueName, ExchangeName, routingKey: RoutingKey);
        }

        public Task SubscribeToEventsAsync(CancellationToken tkn)
        {
            var consumer = new EventingBasicConsumer(_channel);

            consumer.Received += async (model, ea) =>
            {
                try
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);

                    var userId = JsonSerializer.Deserialize<Guid>(message);

                    await _counterService.IncrementUnreadCountAsync(userId, tkn);

                    _channel.BasicAck(ea.DeliveryTag, false);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing RabbitMQ message");
                    _channel.BasicNack(ea.DeliveryTag, false, false);
                }
            };

            _channel.BasicConsume(QueueName, false, consumer);
            _logger.LogInformation("Subscribed to post events from RabbitMQ");

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
        }
    }
