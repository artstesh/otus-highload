namespace OtusHighload.DataAccess;

public interface IOtusContextFactory
{
    OtusContext Get(string? connectionString = null);
    string GetConnectionString();
}

public class OtusContextFactory : IOtusContextFactory
{
    private readonly string _connectionString;
    private readonly string _slaveConnectionString;

    public OtusContextFactory(string connectionString, string slaveConnectionString)
    {
        _connectionString = connectionString;
        _slaveConnectionString = slaveConnectionString;
    }

    public OtusContext Get(string? connectionString = null)
    {
        return new OtusContext(connectionString ?? _connectionString, _slaveConnectionString);
    }

    public string GetConnectionString()
    {
        return _connectionString;
    }
}
