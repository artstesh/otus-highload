namespace UZ.DataAccess;

public interface IAnonymousRepository<TEntity> : IReadonlyAnonymousRepository<TEntity> where TEntity : class
{
    Task<bool> CreateAsync(TEntity entity, CancellationToken cancellationToken);
    Task<bool> UpdateAsync(TEntity entity, CancellationToken token);
    Task<bool> DeleteAsync(Func<TEntity, bool> find, CancellationToken cancellationToken);
}