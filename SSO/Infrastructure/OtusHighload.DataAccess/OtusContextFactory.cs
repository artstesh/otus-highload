namespace OtusHighload.DataAccess;

public interface IOtusContextFactory
{
    OtusContext Create();
}

public class OtusContextFactory : IOtusContextFactory
{
    private readonly string _connectionString;

    public OtusContextFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public OtusContext Create()
    {
        return new OtusContext(_connectionString);
    }
}
