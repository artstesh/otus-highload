namespace UZ.DataAccess
{
    public interface IRepository<TEntity, TPrimaryKey> : IReadonlyRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        Task<bool> CreateAsync(TEntity entity, CancellationToken cancellationToken);
        Task<bool> UpdateAsync(TEntity entity, CancellationToken token);
        Task<bool> DeleteAsync(TPrimaryKey id, CancellationToken cancellationToken);
    }
}