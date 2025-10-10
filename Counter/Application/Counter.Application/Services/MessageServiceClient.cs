using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace Counter.Application.Services;

public interface IMessageServiceClient
{
    Task<bool> MarkMessageAsUnreadAsync(Guid id);
    Task<bool> MarkMessageAsReadAsync(Guid id);
}

public class MessageServiceClient : IMessageServiceClient
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<MessageServiceClient> _logger;

    public MessageServiceClient(IHttpClientFactory httpClientFactory, ILogger<MessageServiceClient> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    public async Task<bool> MarkMessageAsUnreadAsync(Guid id)
    {
        return await HandleProxyResponse(c => c.GetAsync($"/dialog/mark/{id}/read/{false}"));
    }

    public async Task<bool> MarkMessageAsReadAsync(Guid id)
    {
        return await HandleProxyResponse(c => c.GetAsync($"/dialog/mark/{id}/read/{true}"));
    }

    private async Task<bool> HandleProxyResponse(Func<HttpClient, Task<HttpResponseMessage>> request)
    {
        var response = await request(_httpClientFactory.CreateClient("DialogsService"));
        var result = JsonSerializer.Deserialize<bool>(await response.Content.ReadAsStringAsync());

        if (!result)
            _logger.LogError("Request failed: {StatusCode} - {Content}", response.StatusCode, result);

        return result;
    }
}
