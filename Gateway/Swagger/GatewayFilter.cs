using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Gateway.Swagger
{
    internal class GatewayFilter : IDocumentFilter
    {
        private static readonly string[] _ignoredPaths =
        {
            "/configuration",
            "/outputcache/{region}"
        };

        private static readonly string[] _ignoredSchemas =
        {
            "AggregateRouteConfig",
            "FileAggregateRoute",
            "FileAuthenticationOptions",
            "FileCacheOptions",
            "FileQoSOptions",
            "FileConfiguration",
            "FileDynamicRoute",
            "FileGlobalConfiguration",
            "FileHostAndPort",
            "FileHttpHandlerOptions",
            "FileLoadBalancerOptions",
            "FileRateLimitOptions",
            "FileRateLimitRule",
            "FileRoute",
            "FileSecurityOptions",
            "FileServiceDiscoveryProvider"
        };

        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            foreach (var ignorePath in _ignoredPaths) swaggerDoc.Paths.Remove(ignorePath);
            foreach (var ignoreSchema in _ignoredSchemas) swaggerDoc.Components.Schemas.Remove(ignoreSchema);
        }
    }
}