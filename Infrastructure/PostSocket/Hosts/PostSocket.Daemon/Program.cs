// Program.cs нового приложения

using PostSocket.AppServices.Services;
using PostSocket.Daemon.Middleware;
using PostSocket.Daemon.Workers;
using PostSocket.Registry;

var builder = WebApplication.CreateBuilder(args);

// Только сервисы для WebSocket + RabbitMQ
builder.Services.AddSingleton<IWebSocketConnectionManager, WebSocketConnectionManager>();
builder.Services.AddSocket(builder.Configuration);
builder.Services.AddHostedService<RabbitMQBackgroundService>();
builder.Services.AddLogging();

var app = builder.Build();
app.UseWebSockets();
app.UseMiddleware<WebSocketMiddleware>();
app.Run();
