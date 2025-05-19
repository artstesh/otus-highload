namespace UZ.DataAccess
{
    public interface IRepository<TEntity, TPrimaryKey> : IReadonlyRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        Task<Guid?> CreateAsync(string[] names, object item, CancellationToken cancellationToken);
        Task<int> UpdateAsync(string[] names, object item, CancellationToken token);
        Task<int> DeleteAsync(TEntity id, CancellationToken cancellationToken);
    }
}
