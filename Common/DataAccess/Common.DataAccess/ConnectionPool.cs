using System.Collections.Concurrent;
using System.Data;
using System.Diagnostics;
using Npgsql;

namespace Common.DataAccess;

public class ConnectionPool
{
    public static ConnectionPool Instance { get; } = new ConnectionPool();
    private static object _lock = new object();

    private ConnectionPool(){}

    private ConcurrentBag<NpgsqlConnection> _connections = new ConcurrentBag<NpgsqlConnection>();

    public NpgsqlConnection GetConnection(string connectionString)
    {
        if (_connections.TryTake(out var connection))
        {
            return connection.State != ConnectionState.Open ? GetConnection(connectionString) : connection;
        }
        lock (_lock)
        {
            if (_connections.Count > 99)
            {
                Thread.Sleep(1000);
                return GetConnection(connectionString);
            }
        }
        var newConnection = new NpgsqlConnection(connectionString);
        newConnection.Open();
        return newConnection;
    }

    public void ReturnConnection(NpgsqlConnection connection)
    {
        if (connection.State != ConnectionState.Open)
        {
            connection.Close();
            return;
        }
        _connections.Add(connection);
    }
}
