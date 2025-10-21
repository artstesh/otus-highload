using Common.Security.Xss;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

namespace Common.Security
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSecurity(this IApplicationBuilder applicationBuilder,
            IHostEnvironment hostEnvironment)
        {
            if (!hostEnvironment.IsDevelopment())
                applicationBuilder
                    .UseMiddleware<AntiXssMiddleware>()
                    .UseMiddleware<SecurityHeadersMiddleware>()
                    .UseHsts();
            return applicationBuilder;
        }
    }
}