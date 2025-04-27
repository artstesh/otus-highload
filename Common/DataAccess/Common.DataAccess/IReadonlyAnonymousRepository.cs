namespace UZ.DataAccess;

public interface IReadonlyAnonymousRepository<TEntity> where TEntity : class
{
    Task<TEntity?> GetAsync(Func<TEntity, bool> find, CancellationToken cancellationToken = default);
    Task<TEntity?> GetAsTrackingAsync(Func<TEntity, bool> find, CancellationToken cancellationToken = default);
    IQueryable<TEntity> Query();
    Task<List<TEntity>> ListAsync(CancellationToken cancellationToken = default);
}