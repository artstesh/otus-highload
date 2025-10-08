using Dialogs.Entities;

namespace Dialogs.Application.Repositories;

public interface IDialogRepository
{
    Task<string> SendMessageAsync(Guid fromUserId, Guid toUserId, string text);
    Task<IEnumerable<Message>> GetDialogAsync(Guid user1, Guid user2);
    Task<UserStats> GetUserStatsAsync(Guid userId);
}
