namespace UZ.DataAccess;

public class AnonymousRepository<TEntity> : ReadonlyAnonymousRepository<TEntity>,
    IAnonymousRepository<TEntity>
    where TEntity : class
{
    public AnonymousRepository(IContextFactory factory) : base(factory)
    {
    }

    public async Task<bool> CreateAsync(TEntity entity, CancellationToken cancellationToken)
    {
        var context = _factory.Get();
        await context.Set<TEntity>().AddAsync(entity, cancellationToken);
        return await context.SaveChangesAsync(cancellationToken) > 0;
    }

    public async Task<bool> UpdateAsync(TEntity entity, CancellationToken token)
    {
        var context = _factory.Get();
        context.Set<TEntity>().Update(entity);
        await context.SaveChangesAsync(token);
        return true;
    }

    public async Task<bool> DeleteAsync(Func<TEntity, bool> find, CancellationToken cancellationToken)
    {
        var context = _factory.Get();
        var entity = await GetAsync(find, cancellationToken);
        context.Set<TEntity>().Remove(entity);
        return await context.SaveChangesAsync(cancellationToken) > 0;
    }
}