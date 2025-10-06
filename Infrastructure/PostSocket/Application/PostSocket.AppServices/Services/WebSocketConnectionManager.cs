using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using Microsoft.Extensions.Logging;

namespace PostSocket.AppServices.Services;

public interface IWebSocketConnectionManager
{
    Task AddConnection(Guid userId, WebSocket webSocket);
    Task RemoveConnection(Guid userId, WebSocket webSocket);
    Task SendToUserAsync(Guid userId, string message);
    IReadOnlyList<Guid> GetConnectedUsers();
}

public class WebSocketConnectionManager : IWebSocketConnectionManager
{
    private readonly ConcurrentDictionary<Guid, List<WebSocket>> _connections = new();
    private readonly ILogger<WebSocketConnectionManager> _logger;

    public WebSocketConnectionManager(ILogger<WebSocketConnectionManager> logger)
    {
        _logger = logger;
    }

    public async Task AddConnection(Guid userId, WebSocket webSocket)
    {
        var connections = _connections.GetOrAdd(userId, _ => new List<WebSocket>());
        lock (connections)
        {
            connections.Add(webSocket);
        }

        _logger.LogInformation("User {UserId} connected. Total connections: {Count}",
            userId, connections.Count);

        await ReceiveMessages(userId, webSocket);
    }

    public async Task RemoveConnection(Guid userId, WebSocket webSocket)
    {
        if (_connections.TryGetValue(userId, out var connections))
        {
            lock (connections)
            {
                connections.Remove(webSocket);
                if (connections.Count == 0)
                {
                    _connections.TryRemove(userId, out _);
                }
            }
        }

        _logger.LogInformation("User {UserId} disconnected", userId);
    }

    public async Task SendToUserAsync(Guid userId, string message)
    {
        if (_connections.TryGetValue(userId, out var connections))
        {
            var tasks = new List<Task>();
            var buffer = Encoding.UTF8.GetBytes(message);
            var arraySegment = new ArraySegment<byte>(buffer);

            lock (connections)
            {
                foreach (var webSocket in connections.ToList())
                {
                    if (webSocket.State == WebSocketState.Open)
                    {
                        tasks.Add(webSocket.SendAsync(arraySegment, WebSocketMessageType.Text,
                            true, CancellationToken.None));
                    }
                }
            }

            await Task.WhenAll(tasks);
        }
    }

    public IReadOnlyList<Guid> GetConnectedUsers()
    {
        return _connections.Keys.ToList();
    }

    private async Task ReceiveMessages(Guid userId, WebSocket webSocket)
    {
        var buffer = new byte[1024 * 4];

        try
        {
            while (webSocket.State == WebSocketState.Open)
            {
                var result = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await RemoveConnection(userId, webSocket);
                    break;
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error receiving message from user {UserId}", userId);
            await RemoveConnection(userId, webSocket);
        }
    }
}
