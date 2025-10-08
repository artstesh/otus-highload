using Common.DataAccess;
using Dialogs.Application.Repositories;
using Dialogs.Application.Services;
using Dialogs.DataAccess.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dialogs.Registry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDialogs(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddScoped<IDialogRepository, DialogRepository>()
                .AddScoped<IDialogService, DialogService>()
                .AddSingleton<IBoxConnectionPool, BoxConnectionPool>(e => new BoxConnectionPool(configuration.GetConnectionString("Dialogs")!, 3301));

            return services;
        }
    }
}
