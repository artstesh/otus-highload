namespace OtusHighload.Services;

public interface IAuthStoreService
{
    string AddEntry(Guid userId);
    Guid? GetId(Guid token);
}

public class AuthStoreService : IAuthStoreService
{
    private Dictionary<Guid, Guid> _authStore = new Dictionary<Guid, Guid>();
    private const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private int tokenLength = 20;
    private static readonly Random Random = new Random();

    public string AddEntry(Guid userId)
    {
        var token = Guid.NewGuid();
        _authStore.Add(token, userId);
        return token.ToString();
    }

    public Guid? GetId(Guid token)
    {
        return _authStore.ContainsKey(token) ? _authStore[token] : null;
    }
}
