namespace Common.DataAccess;

public interface IOtusContextFactory
{
    OtusContext Get(string? connectionString = null);
    string GetConnectionString();
}

public class OtusContextFactory : IOtusContextFactory
{
    private readonly string _connectionString;

    public OtusContextFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public OtusContextFactory()
    {
        _connectionString = string.Empty;
    }

    public OtusContext Get(string? connectionString = null)
    {
        var cs = connectionString ?? _connectionString;
        if (string.IsNullOrEmpty(cs)) throw new ArgumentNullException(nameof(connectionString));
        return new OtusContext(cs);
    }

    public string GetConnectionString()
    {
        return _connectionString;
    }
}
