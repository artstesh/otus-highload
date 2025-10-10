using Npgsql;
using Polly;
using System.Data.SqlClient;
using Common.DataAccess;

namespace OtusHighload.DataAccess;

public class OtusContext
{
    private readonly string _masterConnectionString;
    private readonly string _slaveConnectionString;

    // Политика повторных попыток для временных ошибок
    private readonly Polly.Retry.AsyncRetryPolicy _policy =
        Policy.Handle<NpgsqlException>(ex => ex.IsTransient)
            .WaitAndRetryAsync(3, retryAttempt =>
                TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

    public OtusContext(string masterConnectionString, string slaveConnectionString)
    {
        _masterConnectionString = masterConnectionString;
        _slaveConnectionString = slaveConnectionString;
    }

    // Методы для операций чтения (используют слейвы)
    public async Task<T> QueryAsync<T>(Func<NpgsqlConnection, Task<T>> func)
    {
        T result = default;
        await ApplyPolicy(async c => result = await func(c), isReadOperation: true);
        return result;
    }

    public T Query<T>(Func<NpgsqlConnection, T> func, bool forceMaster = false)
    {
        var connectionString = _masterConnectionString;
        var connection = ConnectionPool.Instance.GetConnection(connectionString);
        try
        {
            return func(connection);
        }
        finally
        {
            ConnectionPool.Instance.ReturnConnection(connection);
        }
    }

    // Методы для операций записи (используют мастер)
    public Task ExecuteAsync(Func<NpgsqlConnection, Task> func)
    {
        return ApplyPolicy(async c =>
        {
            await func(c);
            return true;
        }, isReadOperation: false);
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
        var connectionString = isReadOperation ? _slaveConnectionString : _masterConnectionString;
        var connection = ConnectionPool.Instance.GetConnection(connectionString);

        T result;
        try
        {
            result = await _policy.ExecuteAsync(() => func(connection));
        }
        finally
        {
            ConnectionPool.Instance.ReturnConnection(connection);
        }

        return result;
    }

    // Дополнительный метод для принудительного использования мастера для чтения
    // (например, для чтения после записи в рамках одной транзакции)
    public async Task<T> QueryWithMasterAsync<T>(Func<NpgsqlConnection, Task<T>> func)
    {
        T result = default;
        await ApplyPolicy(async c => result = await func(c), isReadOperation: false);
        return result;
    }
}
