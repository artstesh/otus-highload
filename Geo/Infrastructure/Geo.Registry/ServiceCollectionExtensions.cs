using Common.DataAccess;
using Geo.Application.Repositories;
using Geo.Application.Services;
using Geo.DataAccess.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Geo.Registry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddGeoFields(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddScoped<IRegionRepository, RegionRepository>()
                .AddScoped<IClusterRepository, ClusterRepository>()
                .AddSingleton<IFieldRepository, FieldRepository>()
                .AddScoped<IRegionService, RegionService>()
                .AddScoped<IClusterService, ClusterService>()
                .AddScoped<IFieldService, FieldService>()
                .AddSingleton<IMessageBusService, RabbitMQService>()
                .AddSingleton<IOtusContextFactory, OtusContextFactory>(p =>
                    new OtusContextFactory(configuration.GetConnectionString("DefaultConnection"),
                         new []
                        {
                            configuration.GetConnectionString("Slave1Connection")!,
                            configuration.GetConnectionString("Slave2Connection")!
                        }));

            return services;
        }
    }
}
