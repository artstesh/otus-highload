namespace OtusHighload.Services;

public interface IAuthStoreService
{
    string AddEntry(Guid userId);
    Guid? GetId(Guid token);
    Guid? CheckExisting(Guid id);
}

public class AuthStoreService : IAuthStoreService
{
    private Dictionary<Guid, Guid> _tokenStore = new Dictionary<Guid, Guid>();
    private Dictionary<Guid, Guid> _idStore = new Dictionary<Guid, Guid>();

    public Guid? CheckExisting(Guid id)
    {
        return _idStore.TryGetValue(id, out var value) ? value : null;
    }

    public string AddEntry(Guid userId)
    {
        var token = Guid.NewGuid();
        _tokenStore.Add(token, userId);
        _idStore.Add(userId,token);
        return token.ToString();
    }

    public Guid? GetId(Guid token)
    {
        return _tokenStore.TryGetValue(token, out var value) ? value : null;
    }
}
