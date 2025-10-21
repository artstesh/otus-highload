using System.Net;
using System.Text;
using Common.Security.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Common.Security.Xss
{
    /// <summary>
    ///     Middleware проверки запросов, параметров, контента на наличие опасного содержимого
    /// </summary>
    public class AntiXssMiddleware : IMiddleware
    {
        private readonly ILogger<AntiXssMiddleware> _logger;

        public AntiXssMiddleware(ILogger<AntiXssMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            context.Request.EnableBuffering();
            // Check XSS in URL
            if (!string.IsNullOrWhiteSpace(context.Request.Path.Value))
            {
                var url = context.Request.Path.Value;

                if (CrossSiteScriptingValidation.IsDangerousUrl(url))
                {
                    _logger.LogWarning("Xss attack was prevented in URL: {url}", url);
                    context.Response.Clear();
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsync("Bad request");
                    return;
                }
            }

            // Check XSS in query string
            if (!string.IsNullOrWhiteSpace(context.Request.QueryString.Value))
            {
                var queryString = WebUtility.UrlDecode(context.Request.QueryString.Value);

                if (CrossSiteScriptingValidation.IsDangerousString(queryString, out var matchIndex))
                {
                    _logger.LogWarning("Xss attack was prevented in query: {queryString}", queryString);
                    context.Response.Clear();
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsync("Bad request");
                    return;
                }
            }

            // Check XSS in request content
            var originalBody = context.Request.Body;
            try
            {
                if (!context.Request.HasFormContentType ||
                    (context.Request.HasFormContentType && !context.Request.Form.Files.Any()))
                {
                    var content = await ReadRequestBody(context);

                    if (CrossSiteScriptingValidation.IsDangerousString(content, out var matchIndex))
                    {
                        _logger.LogWarning("Xss attack was prevented in request content: {content}", content);
                        context.Response.Clear();
                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        await context.Response.WriteAsync("Bad request");
                        return;
                    }
                }

                await next(context);
            }
            finally
            {
                context.Request.Body = originalBody;
            }
        }

        private static async Task<string> ReadRequestBody(HttpContext context)
        {
            var buffer = new MemoryStream();
            await context.Request.Body.CopyToAsync(buffer);
            context.Request.Body = buffer;
            buffer.Position = 0;
            var encoding = Encoding.UTF8;
            var contentType = context.Request.GetTypedHeaders().ContentType;
            if (contentType?.Charset != null && !string.IsNullOrEmpty(contentType.Charset.Value))
                encoding = Encoding.GetEncoding(contentType.Charset.Value);
            var requestContent = await new StreamReader(buffer, encoding).ReadToEndAsync();
            context.Request.Body.Position = 0;
            return requestContent;
        }
    }
}