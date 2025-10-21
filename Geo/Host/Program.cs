using Fields.Services;
using Geo.DataAccess;
using Geo.Registry;
using Prometheus;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
    ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("Redis")));
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
    options.InstanceName = "FeedCache";
});

builder.Services.AddGeoFields(builder.Configuration);
builder.Services.AddSingleton<DbSeedService>();
builder.Services.AddSingleton<IChatMetrics, ChatMetrics>();
builder.Services.AddHealthChecks()
    .AddCheck<HealthCheck>(nameof(HealthCheck));
builder.Services.AddHostedService<RabbitMQBackgroundService>();

var app = builder.Build();
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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
