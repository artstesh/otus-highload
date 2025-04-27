using Microsoft.EntityFrameworkCore;

namespace UZ.DataAccess
{
    public abstract class ReadonlyRepository<TEntity, TPrimaryKey> : ReadonlyAnonymousRepository<TEntity>,
        IReadonlyRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        protected readonly IContextFactory _factory;

        public ReadonlyRepository(IContextFactory factory) : base(factory)
        {
            _factory = factory;
        }

        public Task<TEntity> GetAsync(TPrimaryKey id, CancellationToken cancellationToken = default)
        {
            return _factory.Get().Set<TEntity>().AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id.Equals(id), cancellationToken);
        }

        public Task<TEntity> GetAsTrackingAsync(TPrimaryKey id, CancellationToken cancellationToken = default)
        {
            return _factory.Get().Set<TEntity>().FirstOrDefaultAsync(e => e.Id.Equals(id), cancellationToken);
        }
    }
}