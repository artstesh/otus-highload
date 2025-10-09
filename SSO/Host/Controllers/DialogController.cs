using Microsoft.AspNetCore.Mvc;
using OtusHighload.Contracts.Models;

namespace OtusHighload.Controllers;

[ApiController]
[Route("[controller]")]
public class DialogController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<DialogController> _logger;

    public DialogController(IHttpClientFactory httpClientFactory, ILogger<DialogController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    [Obsolete("Use https://localhost:5002/api/dialogs/{authorId}/send instead")]
    [HttpPost("{authorId}/send")]
    public async Task<IActionResult> SendMessage(string authorId, [FromBody] SendMessageRequest request)
    {
        return await HandleProxyResponse(c => c.PostAsJsonAsync($"/Dialog/{authorId}/send", request));
    }

    [Obsolete("Use https://localhost:5002/api/dialogs/{authorId}/list/with/{withUserId} instead")]
    [HttpGet("{authorId}/list/with/{withUserId}")]
    public async Task<IActionResult> GetDialog(string authorId, string withUserId)
    {
        return await HandleProxyResponse(c => c.GetAsync($"/dialog/{authorId}/list/with/{withUserId}"));
    }

    [Obsolete("Use https://localhost:5002/api/dialogs/{authorId}/list/all instead")]
    [HttpGet("{authorId}/list/all")]
    public async Task<IActionResult> GetAllDialogs(string authorId)
    {
        return await HandleProxyResponse(c => c.GetAsync($"/dialog/{authorId}/list/all"));
    }

    private HttpClient GetClient()
    {
        var client = _httpClientFactory.CreateClient("DialogsService");
        client.DefaultRequestHeaders.Add("X-Request-ID", HttpContext.Request.Headers["X-Request-ID"].First());
        return client;
    }

    private async Task<IActionResult> HandleProxyResponse(Func<HttpClient, Task<HttpResponseMessage>> request)
    {
        var response = await request(GetClient());
        var content = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode) return Ok(content);

        _logger.LogError("Request failed: {StatusCode} - {Content}",
            response.StatusCode, content);

        return StatusCode((int)response.StatusCode, content);
    }
}
