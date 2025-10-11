using Common.DataAccess;
using Counter.Application.Repositories;
using Counter.Application.Services;
using Counter.DataAccess.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Counter.Registry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCounter(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddSingleton<ICounterRepository, CounterRepository>()
                .AddScoped<ISagaRepository, SagaRepository>()
                .AddSingleton<ICounterService, CounterService>()
                .AddScoped<ISagaService, SagaService>()
                .AddScoped<IMessageServiceClient, MessageServiceClient>()
                .AddSingleton<IMessageBusService, RabbitMQService>()
                .AddSingleton<IOtusContextFactory, OtusContextFactory>(p =>
                    new OtusContextFactory(configuration.GetConnectionString("DefaultConnection")!));

            return services;
        }
    }
}
