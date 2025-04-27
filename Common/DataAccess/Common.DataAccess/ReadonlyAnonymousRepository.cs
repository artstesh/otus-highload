using Microsoft.EntityFrameworkCore;

namespace UZ.DataAccess;

public class ReadonlyAnonymousRepository<TEntity> : IReadonlyAnonymousRepository<TEntity> where TEntity : class
{
    protected readonly IContextFactory _factory;

    public ReadonlyAnonymousRepository(IContextFactory factory)
    {
        _factory = factory;
    }

    public Task<TEntity?> GetAsync(Func<TEntity, bool> find, CancellationToken cancellationToken = default)
    {
        return _factory.Get().Set<TEntity>().AsNoTracking()
            .FirstOrDefaultAsync(e => find(e), cancellationToken);
    }

    public Task<TEntity?> GetAsTrackingAsync(Func<TEntity, bool> find, CancellationToken cancellationToken = default)
    {
        return _factory.Get().Set<TEntity>().FirstOrDefaultAsync(e => find(e), cancellationToken);
    }

    public Task<List<TEntity>> ListAsync(CancellationToken cancellationToken)
    {
        return _factory.Get().Set<TEntity>().AsNoTracking().ToListAsync(cancellationToken);
    }

    public IQueryable<TEntity> Query()
    {
        return _factory.Get().Set<TEntity>().AsNoTracking();
    }
}