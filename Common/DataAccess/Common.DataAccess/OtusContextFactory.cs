namespace Common.DataAccess;

public interface IOtusContextFactory
{
    OtusContext Get(string? connectionString = null);
    string GetConnectionString();
}

public class OtusContextFactory : IOtusContextFactory
{
    private readonly string _connectionString;
    private readonly string _slaveConnectionString;

    public OtusContextFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public OtusContextFactory()
    {
        _connectionString = string.Empty;
        _slaveConnectionString = string.Empty;
    }

    public OtusContextFactory(string connectionString, string slaveConnectionString)
    {
        _connectionString = connectionString;
        _slaveConnectionString = slaveConnectionString;
    }

    public OtusContext Get(string? connectionString = null)
    {
        return new OtusContext(connectionString ?? _connectionString, connectionString ??_slaveConnectionString);
    }

    public string GetConnectionString()
    {
        return _connectionString;
    }
}
