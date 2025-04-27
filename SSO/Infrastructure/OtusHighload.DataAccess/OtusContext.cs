using Npgsql;

namespace OtusHighload.DataAccess;

public class OtusContext
{
    private string _connectionString;

    public OtusContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<T> QueryAsync<T>(Func<NpgsqlConnection, Task<T>> func)
    {
        var con = new NpgsqlConnection(connectionString: _connectionString);
        con.Open();
        var result = await func(con);
        await con.CloseAsync();
        return result;
    }

    public T Query<T>(Func<NpgsqlConnection, T> func)
    {
        var con = new NpgsqlConnection(connectionString: _connectionString);
        con.Open();
        var result = func(con);
        con.Close();
        return result;
    }

    public async Task ExecuteAsync(Func<NpgsqlConnection, Task> func)
    {
        var con = new NpgsqlConnection(connectionString: _connectionString);
        con.Open();
        await func(con);
        await con.CloseAsync();
    }

    public void Execute(Action<NpgsqlConnection> func)
    {
        var con = new NpgsqlConnection(connectionString: _connectionString);
        con.Open();
        func(con);
        con.Close();
    }
}
