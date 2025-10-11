using Common.DataAccess;
using Common.Utility;
using Dialogs.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OtusHighload.Application.Services;

namespace Dialogs.Registry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDialogs(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddScoped<IDialogService, DialogService>()
                .AddScoped<IMessageBusService, RabbitMQService>()
                .AddSingleton<ITokenCryptoService, TokenCryptoService>(e => new TokenCryptoService(configuration.GetValue<string>("Security:EncryptionKey")))
                .AddSingleton<IOtusContextFactory, OtusContextFactory>(p =>
                    new OtusContextFactory(configuration.GetConnectionString("DefaultConnection")!));


            return services;
        }
    }
}
