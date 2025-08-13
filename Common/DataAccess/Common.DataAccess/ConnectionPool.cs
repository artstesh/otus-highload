using System.Collections.Concurrent;
using System.Data;
using System.Diagnostics;
using Npgsql;

namespace Common.DataAccess;

public class ConnectionPool
{
    public static ConnectionPool Instance { get; } = new ConnectionPool();

    private ConnectionPool(){}

    private ConcurrentBag<NpgsqlConnection> _connections = new ConcurrentBag<NpgsqlConnection>();

    public NpgsqlConnection GetConnection(string connectionString)
    {
        if (_connections.TryTake(out var connection))
        {
            return connection.FullState != ConnectionState.Open ? GetConnection(connectionString) : connection;
        }
        var newConnection = new NpgsqlConnection(connectionString);
        newConnection.Open();
        return newConnection;
    }

    public void ReturnConnection(NpgsqlConnection connection)
    {
        if (connection.FullState != ConnectionState.Open)
        {
            connection.Close();
            return;
        }
        _connections.Add(connection);
    }
}
