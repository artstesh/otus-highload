namespace Common.DataAccess
{
    public interface IReadonlyRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        Task<TEntity?> GetAsync(TPrimaryKey id, CancellationToken cancellationToken = default);
        Task<IEnumerable<TEntity>> ListAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<TEntity>> ListWhereAsync(string[] names, object item,CancellationToken cancellationToken = default);
        Task<IEnumerable<TEntity>> SelectLikeAsync(string[] names, object item,CancellationToken cancellationToken = default);
    }
}
