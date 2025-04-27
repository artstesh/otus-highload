namespace UZ.DataAccess
{
    public abstract class Repository<TEntity, TPrimaryKey> : ReadonlyRepository<TEntity, TPrimaryKey>,
        IRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        public Repository(IContextFactory factory) : base(factory)
        {
        }

        public async Task<bool> CreateAsync(TEntity entity, CancellationToken cancellationToken)
        {
            var context = _factory.Get();
            var result = await context.Set<TEntity>().AddAsync(entity, cancellationToken);
            return await context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdateAsync(TEntity entity, CancellationToken token)
        {
            var context = _factory.Get();
            context.Set<TEntity>().Update(entity);
            await context.SaveChangesAsync(token);
            return true;
        }

        public async Task<bool> DeleteAsync(TPrimaryKey id, CancellationToken cancellationToken)
        {
            var context = _factory.Get();
            var entity = await GetAsync(id, cancellationToken);
            context.Set<TEntity>().Remove(entity);
            return await context.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}