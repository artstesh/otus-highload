using System.Text;
using System.Text.Json;
using Common.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace PostSocket.AppServices.Services;

public interface IMessageBusService
{
    Task SubscribeToPostEventsAsync(CancellationToken tkn);
}

public class RabbitMQService : IMessageBusService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly IWebSocketConnectionManager _connectionManager;
        private readonly ILogger<RabbitMQService> _logger;

        private const string ExchangeName = "post_events";
        private const string QueueName = "websocket_notifications";
        private const string RoutingKey = "post.created";

        public RabbitMQService(
            IConfiguration configuration,
            IWebSocketConnectionManager connectionManager,
            ILogger<RabbitMQService> logger)
        {
            _connectionManager = connectionManager;
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
            _channel.QueueBind(QueueName, ExchangeName, routingKey: RoutingKey);
        }

        public Task SubscribeToPostEventsAsync(CancellationToken tkn)
        {
            var consumer = new EventingBasicConsumer(_channel);

            consumer.Received += async (model, ea) =>
            {
                try
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    var postEvent = JsonSerializer.Deserialize<PostCreatedEvent>(message);

                    if (postEvent != null)
                    {
                        await ProcessPostEvent(postEvent);
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

        private async Task ProcessPostEvent(PostCreatedEvent postEvent)
        {
            try
            {
                var connectedUsers = _connectionManager.GetConnectedUsers();

                var connectedFriends = postEvent.FriendIds.Intersect(connectedUsers).ToList();

                _logger.LogInformation(
                    "Processing post {PostId} by {AuthorId} for {ConnectedFriendsCount} connected friends",
                    postEvent.PostId, postEvent.AuthorId, connectedFriends.Count);

                var tasks = connectedFriends.Select(friendId =>
                    SendPostNotificationAsync(friendId, postEvent));

                await Task.WhenAll(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing post event for post {PostId}", postEvent.PostId);
            }
        }

        private async Task SendPostNotificationAsync(Guid userId, PostCreatedEvent postEvent)
        {
            try
            {
                // Формируем сообщение согласно спецификации AsyncAPI
                var notification = new
                {
                    postId = postEvent.PostId,
                    postText = postEvent.Text,
                    author_user_id = postEvent.AuthorId
                };

                var message = JsonSerializer.Serialize(notification);
                await _connectionManager.SendToUserAsync(userId, message);

                _logger.LogDebug("Notification sent to user {UserId} about post {PostId}",
                    userId, postEvent.PostId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending notification to user {UserId}", userId);
            }
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
        }
    }
