using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OtusHighload.DataAccess;

namespace SSO.ComponentRegistry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSso(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddSingleton<IOtusContextFactory, OtusContextFactory>(p =>
                    new OtusContextFactory(configuration.GetConnectionString("DefaultConnection")!));

            return services;
        }
    }
}
