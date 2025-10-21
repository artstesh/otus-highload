using Microsoft.AspNetCore.Http;

namespace Common.Security
{
    public class SecurityHeadersMiddleware : IMiddleware
    {
        private const string XFrameOptions = "X-Frame-Options";
        private const string XContentTypeOptions = "X-Content-Type-Options";
        private const string ReferrerPolicy = "Referrer-Policy";
        private const string XXssProtection = "X-Xss-Protection";
        private const string ContentSecurityPolicy = "Content-Security-Policy";

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (!context.Response.Headers.ContainsKey(XFrameOptions))
                context.Response.Headers.Add(XFrameOptions, "SAMEORIGIN");
            if (!context.Response.Headers.ContainsKey(XContentTypeOptions))
                context.Response.Headers.Add(XContentTypeOptions, "nosniff");
            if (!context.Response.Headers.ContainsKey(ReferrerPolicy))
                context.Response.Headers.Add(ReferrerPolicy, "same-origin");
            if (!context.Response.Headers.ContainsKey(XXssProtection))
                context.Response.Headers.Add(XXssProtection, "1");
            if (!context.Response.Headers.ContainsKey(ContentSecurityPolicy))
                context.Response.Headers.Add(ContentSecurityPolicy,
                    "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' blob: data:;");
            await next(context);
        }
    }
}