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
    private readonly Dictionary<string, ConcurrentBag<PoolEntity>> _dic = new();
    private readonly Dictionary<string, SemaphoreSlim> _connectionLimits = new();
    private readonly object _syncRoot = new();

    private ConnectionPool() { }

    private SemaphoreSlim GetOrCreateSemaphore(string key)
    {
        lock (_syncRoot)
        {
            if (!_connectionLimits.ContainsKey(key))
            {
                _connectionLimits[key] = new SemaphoreSlim(_maxPoolSize, _maxPoolSize);
            }
            return _connectionLimits[key];
        }
    }

    public async Task<PoolEntity> GetConnectionAsync(string connectionString)
    {
        var host = Regex.Match(connectionString, "Host=([^;]+);").Groups[1].Value;
        var port = Regex.Match(connectionString, "Port=([^;]+);").Groups[1].Value;
        var key = GetKey(host, port);

        var semaphore = GetOrCreateSemaphore(key);

        // Ожидаем доступного слота для подключения
        await semaphore.WaitAsync();

        try
        {
            if (!_dic.ContainsKey(key))
            {
                lock (_syncRoot)
                {
                    if (!_dic.ContainsKey(key))
                        _dic[key] = new ConcurrentBag<PoolEntity>();
                }
            }

            if (_dic[key].TryTake(out var poolEntity))
            {
                if (poolEntity.Connection.FullState == ConnectionState.Open)
                    return poolEntity;

                await poolEntity.Connection.DisposeAsync();
                // Рекурсивно пытаемся получить другое соединение
                return await GetConnectionAsync(connectionString);
            }

            var newConnection = new PoolEntity
            {
                Connection = new NpgsqlConnection(connectionString)
            };
            await newConnection.Connection.OpenAsync();
            return newConnection;
        }
        catch
        {
            // Освобождаем семафор в случае ошибки
            semaphore.Release();
            throw;
        }
    }

    public void ReturnConnection(PoolEntity entity)
    {
        if (entity == null) return;

        var key = GetKey(entity.Connection.Host, entity.Connection.Port.ToString());
        var semaphore = GetOrCreateSemaphore(key);

        try
        {
            if (!_dic.ContainsKey(key))
            {
                lock (_syncRoot)
                {
                    if (!_dic.ContainsKey(key))
                        _dic[key] = new ConcurrentBag<PoolEntity>();
                }
            }

            if (_dic[key].Count >= _maxPoolSize ||
                entity.Connection.FullState != ConnectionState.Open ||
                entity.Expiraion < DateTime.Now)
            {
                entity.Connection.Dispose();
            }
            else
            {
                _dic[key].Add(entity);
            }
        }
        finally
        {
            // Освобождаем слот при возврате соединения
            semaphore.Release();
        }
    }

    private string GetKey(string host, string port) => $"{host}:{port}";
}
