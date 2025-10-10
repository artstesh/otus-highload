using Common.Utility;

namespace OtusHighload.Services;

public interface IAuthStoreService
{
    string GetToken(Guid id);
    Guid? GetId(string token);
}

public class AuthStoreService : IAuthStoreService
{
    private readonly ITokenCryptoService _crypto;
    private Dictionary<Guid, Guid> _tokenStore = new Dictionary<Guid, Guid>();
    private Dictionary<Guid, Guid> _idStore = new Dictionary<Guid, Guid>();

    public AuthStoreService(ITokenCryptoService crypto)
    {
        _crypto = crypto;
    }

    public string GetToken(Guid id)
    {
        return _crypto.EncryptUserId(id);
    }

    public Guid? GetId(string token)
    {
        try
        {
            return _crypto.DecryptUserId(token);
        }
        catch
        {
            return null;
        }
    }
}
