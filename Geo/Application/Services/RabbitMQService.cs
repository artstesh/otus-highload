using System.Text;
using System.Text.Json;
using Common.Contracts;
using Geo.Application.Repositories;
using Geo.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Geo.Application.Services;

public interface IMessageBusService
{
    Task SubscribeToPostEventsAsync(CancellationToken tkn);
}

public class RabbitMQService : IMessageBusService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly ILogger<RabbitMQService> _logger;
        private IFieldRepository _repository;

        private const string ExchangeName = "field_events";
        private const string QueueName = "websocket_notifications";
        private const string RoutingKey = "field.created";

        public RabbitMQService(IConfiguration configuration,
            ILogger<RabbitMQService> logger, IFieldRepository repository)
        {
            _logger = logger;
            _repository = repository;

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

        public Task SubscribeToPostEventsAsync(CancellationToken tkn)
        {
            var consumer = new EventingBasicConsumer(_channel);

            consumer.Received += async (model, ea) =>
            {
                _logger.LogWarning("Processing RabbitMQ message");
                try
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    var postEvent = JsonSerializer.Deserialize<FieldCreatedEvent>(message);

                    if (postEvent != null)
                    {
                        await ProcessPostEvent(postEvent, tkn);
                    }

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

        private async Task ProcessPostEvent(FieldCreatedEvent fieldEvent, CancellationToken tkn)
        {
            try
            {
                var result = await _repository.Add(new GeoField
                {
                    Id = fieldEvent.Id,
                    Wkt = fieldEvent.Wkt,
                    RegionId = fieldEvent.RegionId
                }, tkn);

                _logger.LogInformation($"Processing geoField {result}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing post event for post {PostId}", fieldEvent.Id);
            }
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
        }
    }
