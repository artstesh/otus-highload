using Common.Utility;
using Dialogs.Application.Repositories;
using Dialogs.Entities;
using Microsoft.Extensions.Logging;

namespace Dialogs.Application.Services;

public interface IDialogService
{
    Task<string> SendMessageAsync(Guid fromUserId, Guid toUserId, string text);
    Task<IEnumerable<Message>> GetDialogAsync(Guid user1, Guid user2);
    Task<UserStats> GetUserStatsAsync(Guid userId);
    Task<int> GetUserMessageCountAsync(Guid userId);
}

public class DialogService : IDialogService
{
    private readonly IDialogRepository _repository;
    private readonly ILogger<DialogService> _logger;

    public DialogService(IDialogRepository repository, ILogger<DialogService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<string> SendMessageAsync(Guid fromUserId, Guid toUserId, string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            throw new ArgumentException("Message text cannot be empty", nameof(text));

        var messageId = await _repository.SendMessageAsync(fromUserId, toUserId, text);

        _logger.LogDebug($"Message {messageId} sent from {fromUserId} to {toUserId}");
        return messageId;
    }

    public async Task<IEnumerable<Message>> GetDialogAsync(Guid user1, Guid user2)
    {

        var messages = (await _repository.GetDialogAsync(user1, user2)).ToList();

        _logger.LogDebug($"Retrieved {messages.Count()} messages for dialog between {user1} and {user2}");
        return messages;
    }

    public async Task<UserStats> GetUserStatsAsync(Guid userId)
    {
        var messages = await _repository.GetUserStatsAsync(userId);
        _logger.LogDebug($"Retrieved {messages.TotalCount} total messages for user {userId}");
        return messages;
    }

    public async Task<int> GetUserMessageCountAsync(Guid userId)
    {
        var messages = await _repository.GetUserStatsAsync(userId);
        _logger.LogDebug($"Retrieved {messages.TotalCount} total messages for user {userId}");
        return messages.TotalCount;
    }
}
