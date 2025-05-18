namespace OtusHighload.Services;

public interface IAuthStoreService
{
    string AddEntry(Guid userId);
    Guid? GetId(string token);
}

public class AuthStoreService : IAuthStoreService
{
    private Dictionary<string, Guid> _authStore = new Dictionary<string, Guid>();
    private const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private int tokenLength = 20;
    private static readonly Random Random = new Random();

    public string AddEntry(Guid userId)
    {
        var token =new string(Enumerable.Repeat(chars, tokenLength)
            .Select(s => s[Random.Next(s.Length)]).ToArray());
        _authStore.Add(token, userId);
        return token;
    }

    public Guid? GetId(string token)
    {
        return _authStore.ContainsKey(token) ? _authStore[token] : null;
    }
}
