using Common.DataAccess;
using Fields.Application.Repositories;
using Fields.Application.Services;
using Fields.DataAccess.Managers;
using Fields.DataAccess.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Fields.Registry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddFields(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddSingleton<IFieldRepository, FieldRepository>()
                .AddScoped<IFieldService, FieldService>()
                .AddScoped<IRegionService, RegionService>()
                .AddSingleton<IShardManager, ShardManager>()
                .AddSingleton<IOtusContextFactory, OtusContextFactory>()
                .AddSingleton<IMessageBusService, RabbitMQService>();

            return services;
        }
    }
}
