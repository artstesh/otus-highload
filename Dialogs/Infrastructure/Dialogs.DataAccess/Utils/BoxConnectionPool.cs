using System.Collections.Concurrent;
using ProGaudi.Tarantool.Client;

public interface IBoxConnectionPool
{
    Task<IBox> GetConnectionAsync();
    void ReturnConnection(IBox connection);
    void Dispose();
}

public class BoxConnectionPool : IDisposable, IBoxConnectionPool
{
    private readonly ConcurrentBag<IBox> _connections;
    private readonly string _connectionString;
    private readonly int _port;
    private readonly int _maxPoolSize;
    private readonly SemaphoreSlim _poolSemaphore;
    private bool _isDisposed;

    public BoxConnectionPool(string connectionString, int port, int maxPoolSize = 50)
    {
        _connectionString = connectionString;
        _port = port;
        _maxPoolSize = maxPoolSize;
        _connections = new ConcurrentBag<IBox>();
        _poolSemaphore = new SemaphoreSlim(maxPoolSize, maxPoolSize);
    }

    public async Task<IBox> GetConnectionAsync()
    {
        await _poolSemaphore.WaitAsync();

        try
        {
            if (_connections.TryTake(out var connection))
            {
                return connection;
            }

            // Создаем новое соединение, если в пуле нет доступных
            return await Box.Connect(_connectionString, _port);
        }
        catch
        {
            _poolSemaphore.Release();
            throw;
        }
    }

    public void ReturnConnection(IBox connection)
    {
        if (connection == null) throw new ArgumentNullException(nameof(connection));

        try
        {
            // Проверяем, не превышен ли максимальный размер пула
            if (_connections.Count >= _maxPoolSize)
            {
                connection.Dispose();
            }
            else
            {
                _connections.Add(connection);
            }
        }
        finally
        {
            _poolSemaphore.Release();
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_isDisposed) return;

        if (disposing)
        {
            foreach (var connection in _connections)
            {
                connection?.Dispose();
            }
            _poolSemaphore.Dispose();
        }

        _isDisposed = true;
    }
}
