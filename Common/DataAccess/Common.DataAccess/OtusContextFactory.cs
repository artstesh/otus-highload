namespace OtusHighload.DataAccess;

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

    public OtusContext Get(string? connectionString = null)
    {
        return new OtusContext(connectionString ?? _connectionString);
    }

    public string GetConnectionString()
    {
        return _connectionString;
    }
}
