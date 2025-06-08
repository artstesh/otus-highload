using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OtusHighload.Application.Repositories;
using OtusHighload.Application.Services;
using OtusHighload.DataAccess;
using Common.DataAccess;

namespace SSO.ComponentRegistry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSso(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IUserService, UserService>()
                .AddSingleton<IOtusContextFactory>(new OtusContextFactory("User ID=postgres;Password=postgres;Host=postgres;Port=5432;Database=otus_highload;Pooling=true;"))
                .AddSingleton<IOtusContextFactory, OtusContextFactory>(p =>
                    new OtusContextFactory(configuration.GetConnectionString("DefaultConnection")!));

            return services;
        }
    }
}
