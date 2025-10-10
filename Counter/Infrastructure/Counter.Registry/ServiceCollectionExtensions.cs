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
                .AddScoped<ICounterRepository, CounterRepository>()
                .AddScoped<ICounterService, CounterService>()
                .AddSingleton<IOtusContextFactory, OtusContextFactory>(p =>
                    new OtusContextFactory(configuration.GetConnectionString("DefaultConnection")!));

            return services;
        }
    }
}
