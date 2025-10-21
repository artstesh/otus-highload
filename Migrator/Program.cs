using AgroPlatform.Migrator;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", true, true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", true,
        true)
    .AddEnvironmentVariables()
    .AddCommandLine(args);
builder.Services.AddMigrator(builder.Configuration);
builder.Services.AddCors();

var app = builder.Build();

app.Run();
