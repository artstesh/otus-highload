using Common.DataAccess;
using Dialogs.Application.Services;
using Dialogs.DataAccess.Managers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dialogs.Registry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDialogs(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddSingleton<IShardManager, ShardManager>()
                .AddScoped<IDialogService, DialogService>()
                .AddSingleton<IOtusContextFactory, OtusContextFactory>();

            return services;
        }
    }
}
