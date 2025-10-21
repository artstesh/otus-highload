using System;
using System.Reflection;
using AgroPlatform.Migrator.Hosts;
using AgroPlatform.Migrator.Services;
using FluentMigrator.Runner;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AgroPlatform.Migrator;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMigrator(this IServiceCollection services, IConfiguration Configuration)
    {
        services.AddHttpClient<FieldService>(
                (provider, client) =>
                {
                    client.Timeout = new TimeSpan(1, 0, 0);
                    client.BaseAddress = new Uri(Configuration["Application:Endpoints:Fields"]);
                });
        services.AddHttpClient<GeoService>(
                (provider, client) =>
                {
                    client.BaseAddress = new Uri(Configuration["Application:Endpoints:Geo"]);
                });

        return services
            .AddHostedService<MigratorHostedService>()
            .AddLogging(c => c.AddFluentMigratorConsole())
            .AddFluentMigratorCore()
            .ConfigureRunner(c => c
                .AddPostgres()
                .WithVersionTable(new VersionTable())
                .WithGlobalConnectionString(Configuration.GetConnectionString("Default"))
                .ScanIn(Assembly.GetExecutingAssembly()).For.Migrations());
    }
}
