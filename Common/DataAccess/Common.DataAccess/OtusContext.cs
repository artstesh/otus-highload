using Npgsql;
using Polly;

namespace Common.DataAccess;

public class OtusContext
{
    private string _masterConnectionString;
    private readonly string[] _slaveConnectionStrings;
    private readonly Random _random = new();

    private Polly.Retry.AsyncRetryPolicy policy = Policy.Handle<NpgsqlException>(ex => ex.IsTransient)
        .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

    public OtusContext(string masterConnectionString, string[] slaveConnectionStrings)
    {
        _masterConnectionString = masterConnectionString;
        _slaveConnectionStrings = slaveConnectionStrings;
    }

    public async Task<T> QueryAsync<T>(Func<NpgsqlConnection, Task<T>> func, bool read = true)
    {
        T result = default;
        await ApplyPolicy(async c => result = await func(c), isReadOperation: read);
        return result;
    }

    public Task ExecuteAsync(Func<NpgsqlConnection, Task> func)
    {
        return ApplyPolicy(async c =>
        {
            await func(c);
            return true;
        }, isReadOperation: false);
    }

    public T Query<T>(Func<NpgsqlConnection, T> func)
    {
        var connection = new NpgsqlConnection(_masterConnectionString);
        connection.Open();
        var result = func(connection);
        connection.Close();
        return result;
    }

    public void Execute(Action<NpgsqlConnection> func)
    {
        var connection = new NpgsqlConnection(_masterConnectionString);
        connection.Open();
        func(connection);
        connection.Close();
    }

    private async Task<T> ApplyPolicy<T>(Func<NpgsqlConnection, Task<T>> func, bool isReadOperation)
    {
        var connectionString = _masterConnectionString;
        var connection = await ConnectionPool.Instance.GetConnection(connectionString);

        T result;
        try
        {
            result = await policy.ExecuteAsync(() => func(connection.Connection));
        }
        finally
        {
            ConnectionPool.Instance.ReturnConnection(connection);
        }

        return result;
    }

    private string GetSlaveConnectionString()
    {
        if (_slaveConnectionStrings == null || _slaveConnectionStrings.Length == 0)
        {
            return _masterConnectionString;
        }

        var index = _random.Next(0, _slaveConnectionStrings.Length);
        return _slaveConnectionStrings[index];
    }
}
