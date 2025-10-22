namespace Common.DataAccess;

public interface IOtusContextFactory
{
    OtusContext Get(string? connectionString = null);
    string GetConnectionString();
}

public class OtusContextFactory : IOtusContextFactory
{
    private readonly string _connectionString;
    private readonly string[] _slaveConnectionStrings;

    public OtusContextFactory(string connectionString, string[] slaveConnectionStrings)
    {
        _connectionString = connectionString;
        _slaveConnectionStrings = slaveConnectionStrings;
    }

    public OtusContextFactory()
    {
        _connectionString = string.Empty;
        _slaveConnectionStrings = [];
    }

    public OtusContext Get(string? connectionString = null)
    {
        return new OtusContext(connectionString ?? _connectionString, _slaveConnectionStrings);
    }

    public string GetConnectionString()
    {
        return _connectionString;
    }
}
