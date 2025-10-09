using Common.Utility;
using OtusHighload.DataAccess;
using OtusHighload.Registry;
using OtusHighload.Services;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
    ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("Redis")));
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
    options.InstanceName = "FeedCache";
});

builder.Services.AddHttpClient("DialogsService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Dialogs"]);
    client.DefaultRequestHeaders.Add("User-Agent", "SSOService");
}).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
});;
builder.Services.AddSingleton<IAuthStoreService, AuthStoreService>();
builder.Services.AddSingleton<DbSeedService>();
builder.Services.AddSso(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseMiddleware<RequestIdLoggingMiddleware>();
app.MapControllers();
app.Services.GetRequiredService<DbSeedService>().Seed();
app.Run();
