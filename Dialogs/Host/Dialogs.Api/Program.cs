using Dialogs.DataAccess;
using Dialogs.Registry;
using Dialogs.Services;
using Prometheus;

var builder = WebApplication.CreateBuilder(args);

// Конфигурация метрик
builder.Services.AddMetrics();
builder.Services.UseHttpClientMetrics();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDialogs(builder.Configuration);
builder.Services.AddSingleton<DbSeedService>();
builder.Services.AddSingleton<IChatMetrics, ChatMetrics>();
builder.Services.AddHealthChecks()
    .AddCheck<HealthCheck>(nameof(HealthCheck));

var app = builder.Build();

// Метрики Prometheus
app.UseHttpMetrics(options =>
{
    options.RequestDuration.Enabled = true;
    options.InProgress.Enabled = true;
    options.RequestCount.Enabled = true;
});

app.MapMetrics(); // Эндпоинт /metrics для Prometheus

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.Use((context, next) =>
{
    Metrics.CreateCounter("http_requests_total", "Total number of HTTP requests.", new CounterConfiguration
    {
        LabelNames = new[] { "method", "endpoint", "status_code" }
    }).WithLabels(context.Request.Method, context.Request.Path, context.Response.StatusCode.ToString()).Inc();
    return next();
});
app.MapControllers();
app.Services.GetRequiredService<DbSeedService>().Seed();
app.Run();
