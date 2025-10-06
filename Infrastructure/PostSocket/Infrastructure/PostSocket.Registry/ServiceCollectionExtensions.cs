using Microsoft.Extensions.DependencyInjection;
using PostSocket.AppServices.Services;
using Microsoft.Extensions.Configuration;

namespace PostSocket.Registry;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSocket(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddSingleton<IMessageBusService, RabbitMQService>();

        return services;
    }
}
