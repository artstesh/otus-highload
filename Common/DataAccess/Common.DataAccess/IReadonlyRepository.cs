namespace UZ.DataAccess
{
    public interface IReadonlyRepository<TEntity, TPrimaryKey> : IReadonlyAnonymousRepository<TEntity>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        Task<TEntity> GetAsync(TPrimaryKey id, CancellationToken cancellationToken = default);
        Task<TEntity> GetAsTrackingAsync(TPrimaryKey id, CancellationToken cancellationToken = default);
    }
}