using System.Collections.Concurrent;
using System.Data;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Npgsql;

namespace Common.DataAccess;

public class PoolEntity
{
    public DateTime Expiraion { get; set; } = DateTime.Now.AddMinutes(4);
    public NpgsqlConnection Connection { get; set; }
}

public class ConnectionPool
{
    public static ConnectionPool Instance { get; } = new ConnectionPool();
    private readonly int _maxPoolSize = 90;

    private ConnectionPool(){}

    private Dictionary<string, ConcurrentBag<PoolEntity>> _dic = new Dictionary<string, ConcurrentBag<PoolEntity>>();

    public PoolEntity GetConnection(string connectionString)
    {
        var key = GetKey(Regex.Match(connectionString, "Host=([^;]+);").Groups[1].Value
            ,Regex.Match(connectionString, "Port=([^;]+);").Groups[1].Value);
        if(!_dic.ContainsKey(key))
            _dic[key] = new ConcurrentBag<PoolEntity>();
        if (_dic[key].TryTake(out var poolEntity))
        {
            return poolEntity.Connection.FullState != ConnectionState.Open ? GetConnection(connectionString) : poolEntity;
        }
        var newConnection = new PoolEntity{Connection = new NpgsqlConnection(connectionString)};
        newConnection.Connection.Open();
        return newConnection;
    }

    public void ReturnConnection(PoolEntity entity)
    {
        var key = GetKey(entity.Connection.Host,entity.Connection.Port.ToString());
        if(!_dic.ContainsKey(key))
            _dic[key] = new ConcurrentBag<PoolEntity>();
        if (_dic[key].Count >= _maxPoolSize || entity.Connection.FullState != ConnectionState.Open ||
            entity.Expiraion < DateTime.Now)
        {
            entity.Connection.Dispose();
            return;
        }
        _dic[key].Add(entity);
    }

    private string GetKey(string host, string port)
    {
        return $"{host}:{port}";
    }
}
