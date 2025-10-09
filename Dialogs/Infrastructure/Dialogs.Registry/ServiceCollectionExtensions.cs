using Common.DataAccess;
using Common.Utility;
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
                .AddSingleton<ITokenCryptoService, TokenCryptoService>(e => new TokenCryptoService(configuration.GetValue<string>("Security:EncryptionKey")))
                .AddSingleton<IOtusContextFactory, OtusContextFactory>()
                .AddScoped<IRequestContext, RequestContext>()
                .AddTransient<RequestIdLoggingMiddleware>();

            return services;
        }
    }
}
