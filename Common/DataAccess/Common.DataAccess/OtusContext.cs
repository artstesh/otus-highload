using Npgsql;
using Polly;

namespace Common.DataAccess;

public class OtusContext
{
    private string _connectionString;

    private Polly.Retry.AsyncRetryPolicy policy = Policy.Handle<NpgsqlException>(ex => ex.IsTransient)
        .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

    public OtusContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<T> QueryAsync<T>(Func<NpgsqlConnection, Task<T>> func)
    {
        T result = default;
        await ApplyPolicy(async c => result = await func(c));
        return result;
    }

    public Task ExecuteAsync(Func<NpgsqlConnection, Task> func)
    {
        return ApplyPolicy(async c =>
        {
            await func(c);
            return true;
        });
    }

    public T Query<T>(Func<NpgsqlConnection, T> func)
    {
        var connection = new NpgsqlConnection(_connectionString);
        connection.Open();
        var result = func(connection);
        connection.Close();
        return result;
    }

    public void Execute(Action<NpgsqlConnection> func)
    {
        var connection = new NpgsqlConnection(_connectionString);
        connection.Open();
        func(connection);
        connection.Close();
    }

    private async Task<T> ApplyPolicy<T>(Func<NpgsqlConnection, Task<T>> func)
    {
        var connection = await ConnectionPool.Instance.GetConnectionAsync(_connectionString);

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
}
