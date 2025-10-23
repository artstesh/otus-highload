using System.Collections.Concurrent;
using System.Data;
using System.Text.RegularExpressions;
using Npgsql;

namespace Common.DataAccess;

public class PoolEntity
{
    public DateTime Expiration { get; set; } = DateTime.Now.AddMinutes(4);
    public NpgsqlConnection Connection { get; set; }
}

public class ConnectionPool
{
    public static ConnectionPool Instance { get; } = new ConnectionPool();
    private readonly int _maxPoolSize = 180;

    private ConnectionPool()
    {
    }

    private readonly ConcurrentDictionary<string, PoolEndpoint> _dic = new();

    public async Task<PoolEntity> GetConnectionAsync(string connectionString)
    {
        var host = Regex.Match(connectionString, "Host=([^;]+);").Groups[1].Value;
        var port = Regex.Match(connectionString, "Port=([^;]+);").Groups[1].Value;
        var key = GetKey(host, port);

        var poolEndpoint = _dic.GetOrAdd(key, _ => new PoolEndpoint(_maxPoolSize));

        // Ожидаем доступного слота соединения
        await poolEndpoint.Semaphore.WaitAsync();

        try
        {
            if (poolEndpoint.AvailableConnections.TryTake(out var poolEntity) &&
                IsConnectionValid(poolEntity))
                return poolEntity;

            var newConnection = new PoolEntity
            {
                Connection = new NpgsqlConnection(connectionString)
            };
            await newConnection.Connection.OpenAsync();
            return newConnection;
        }
        catch
        {
            poolEndpoint.Semaphore.Release();
            throw;
        }
    }

    public void ReturnConnection(PoolEntity entity)
    {
        var key = GetKey(entity.Connection.Host, entity.Connection.Port.ToString());

        if (!_dic.TryGetValue(key, out var poolEndpoint))
        {
            // Если пула для этого ключа нет - просто уничтожаем соединение
            entity.Connection.Dispose();
            return;
        }

        if (!IsConnectionValid(entity) ||
            poolEndpoint.AvailableConnections.Count >= _maxPoolSize)
        {
            // Соединение невалидно или пул переполнен - уничтожаем и освобождаем слот
            entity.Connection.Dispose();
            poolEndpoint.Semaphore.Release();
            return;
        }

        // Возвращаем соединение в пул
        entity.Expiration = DateTime.Now.AddMinutes(4);
        poolEndpoint.AvailableConnections.Add(entity);
        poolEndpoint.Semaphore.Release();
    }

    private bool IsConnectionValid(PoolEntity entity)
    {
        var isConnectionValid = entity.Connection?.FullState == ConnectionState.Open &&
                                entity.Expiration > DateTime.Now;
        if (!isConnectionValid) entity.Connection?.Dispose();
        return isConnectionValid;
    }

    private string GetKey(string host, string port)
    {
        return $"{host}:{port}";
    }

    private class PoolEndpoint
    {
        public ConcurrentBag<PoolEntity> AvailableConnections { get; } = new();
        public SemaphoreSlim Semaphore { get; }

        public PoolEndpoint(int maxPoolSize)
        {
            Semaphore = new SemaphoreSlim(maxPoolSize, maxPoolSize);
        }
    }
}
