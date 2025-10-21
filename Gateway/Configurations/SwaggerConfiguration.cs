using System;
using System.IO;
using System.Reflection;
using Common.Utility.SwaggerFilters;
using Gateway.Swagger;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Gateway.Configurations;

public static class SwaggerConfiguration
{
    public static IServiceCollection AddSwaggerServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        return services.AddSwaggerForOcelot(configuration, options =>
            {
                options.GenerateDocsDocsForGatewayItSelf(itself =>
                {
                    itself.DocumentFilter<GatewayFilter>();
                    itself.OperationFilter<OptionalRouteParameterOperationFilter>();
                    var xfile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xpath = Path.Combine(AppContext.BaseDirectory, xfile);
                    itself.FilePathsForXmlComments = new[] { xpath };
                });
                options.GenerateDocsForGatewayItSelf = true;
                options.GenerateDocsForAggregates = true;
            },
            options => { });
    }
}