using System.Collections.Concurrent;
using System.Data;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Npgsql;

namespace Common.DataAccess;

public class ConnectionPool
{
    public static ConnectionPool Instance { get; } = new ConnectionPool();
    private readonly int _maxPoolSize = 90;

    private ConnectionPool(){}

    private Dictionary<string, ConcurrentBag<NpgsqlConnection>> _dic = new Dictionary<string, ConcurrentBag<NpgsqlConnection>>();

    public NpgsqlConnection GetConnection(string connectionString)
    {
        var key = GetKey(Regex.Match(connectionString, "Host=([^;]+);").Groups[1].Value
        ,Regex.Match(connectionString, "Port=([^;]+);").Groups[1].Value);
        if(!_dic.ContainsKey(key))
            _dic[key] = new ConcurrentBag<NpgsqlConnection>();
        if (_dic[key].TryTake(out var connection))
        {
            return connection.FullState != ConnectionState.Open ? GetConnection(connectionString) : connection;
        }
        var newConnection = new NpgsqlConnection(connectionString);
        newConnection.Open();
        return newConnection;
    }

    public void ReturnConnection(NpgsqlConnection connection)
    {
        var key = GetKey(connection.Host,connection.Port.ToString());
        if(!_dic.ContainsKey(key))
            _dic[key] = new ConcurrentBag<NpgsqlConnection>();
        if (_dic[key].Count >= _maxPoolSize || connection.FullState != ConnectionState.Open)
        {
            connection.Dispose();
            return;
        }
        _dic[key].Add(connection);
    }

    private string GetKey(string host, string port)
    {
        return $"{host}:{port}";
    }
}
