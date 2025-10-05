using System.Collections.Concurrent;
using System.Data;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Npgsql;

namespace Common.DataAccess;

public class ConnectionPool
{
    public static ConnectionPool Instance { get; } = new ConnectionPool();

    private ConnectionPool(){}

    private Dictionary<string, ConcurrentBag<NpgsqlConnection>> _dic = new Dictionary<string, ConcurrentBag<NpgsqlConnection>>();

    public NpgsqlConnection GetConnection(string connectionString)
    {
        var host = Regex.Match(connectionString, "Host=([^;]+);").Groups[1].Value;
        if(!_dic.ContainsKey(host))
            _dic[host] = new ConcurrentBag<NpgsqlConnection>();
        if (_dic[host].TryTake(out var connection))
        {
            return connection.FullState != ConnectionState.Open ? GetConnection(connectionString) : connection;
        }
        var newConnection = new NpgsqlConnection(connectionString);
        newConnection.Open();
        return newConnection;
    }

    public void ReturnConnection(NpgsqlConnection connection)
    {
        if(!_dic.ContainsKey(connection.Host))
            _dic[connection.Host] = new ConcurrentBag<NpgsqlConnection>();
        if (connection.FullState != ConnectionState.Open)
        {
            connection.Close();
            return;
        }
        _dic[connection.Host].Add(connection);
    }
}
