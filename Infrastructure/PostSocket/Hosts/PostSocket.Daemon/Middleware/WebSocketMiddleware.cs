using System.Net.WebSockets;
using PostSocket.AppServices.Services;

namespace PostSocket.Daemon.Middleware;

public class WebSocketMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IWebSocketConnectionManager _connectionManager;
    private readonly ILogger<WebSocketMiddleware> _logger;

    public WebSocketMiddleware(RequestDelegate next,
        IWebSocketConnectionManager connectionManager,
        ILogger<WebSocketMiddleware> logger)
    {
        _next = next;
        _connectionManager = connectionManager;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path == "/post/feed/posted" && context.WebSockets.IsWebSocketRequest)
        {
            if (!context.Request.Query.TryGetValue("userId", out var userId))
            {
                context.Response.StatusCode = 401;
                return;
            }
            _logger.LogInformation(userId);
            WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
            await _connectionManager.AddConnection(Guid.Parse(userId), webSocket);
        }
        else
        {
            await _next(context);
        }
    }

    private async Task<Guid> AuthenticateUser(HttpContext context)
    {
        // Реализация аутентификации пользователя
        // Например, проверка JWT токена из query string или header
        return Guid.NewGuid(); // Заглушка
    }
}
