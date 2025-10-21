using Fields.DataAccess;
using Fields.Registry;
using Fields.Services;
using Prometheus;

var builder = WebApplication.CreateBuilder(args);

builder.Services.UseHttpClientMetrics();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient("GeoService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Geo"]);
    client.DefaultRequestHeaders.Add("User-Agent", "FieldService");
}).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
});

builder.Services.AddFields(builder.Configuration);
builder.Services.AddSingleton<DbSeedService>();
builder.Services.AddHealthChecks()
    .AddCheck<HealthCheck>(nameof(HealthCheck));

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

;
app.MapControllers();
app.Services.GetRequiredService<DbSeedService>().Seed();
app.Run();
