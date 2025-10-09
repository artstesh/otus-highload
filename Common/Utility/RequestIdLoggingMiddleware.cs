using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Common.Utility;

public class RequestIdLoggingMiddleware : IMiddleware
{
    private readonly ILogger<RequestIdLoggingMiddleware> _logger;
    private readonly IRequestContext _requestContext;
    private const string XRequestId = "X-Request-ID";

    public RequestIdLoggingMiddleware(ILogger<RequestIdLoggingMiddleware> logger, IRequestContext requestContext)
    {
        _logger = logger;
        _requestContext = requestContext;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (context.Request.Path.StartsWithSegments("/Dialog"))
        {
            var requestId = context.Request.Headers[XRequestId].FirstOrDefault() ?? Guid.NewGuid().ToString();
            _requestContext.RequestId = requestId;
            context.Request.Headers.Remove(XRequestId);
            context.Request.Headers.Append(XRequestId, requestId);
            _logger.LogInformation("Request started: {RequestId}", requestId);
        }
        await next(context);
    }
}
