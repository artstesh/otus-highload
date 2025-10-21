using Common.Security.Xss;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Common.Security
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSecurity(this IServiceCollection services)
        {
            return services
                .AddTransient<AntiXssMiddleware>()
                .AddTransient<SecurityHeadersMiddleware>()
                .AddHsts(options => { options.Preload = true; });
        }
    }
}