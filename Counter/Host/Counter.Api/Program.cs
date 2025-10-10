using Counter.Api.Services;
using Counter.Application.Services;
using Counter.Registry;
using OtusHighload.DataAccess;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
    ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("Redis")));
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
    options.InstanceName = "CounterCache";
});

builder.Services.AddHttpClient("DialogsService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Dialogs"]);
    client.DefaultRequestHeaders.Add("User-Agent", "SSOService");
}).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
});

builder.Services.AddSingleton<DbSeedService>();
builder.Services.AddCounter(builder.Configuration);
builder.Services.AddScoped<ISagaCoordinator, SagaCoordinator>();
// Регистрация фоновой службы очистки
// builder.Services.AddHostedService<SagaCleanupService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
