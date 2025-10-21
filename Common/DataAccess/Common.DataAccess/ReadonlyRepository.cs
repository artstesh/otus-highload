using Dapper;

namespace Common.DataAccess
{
    public abstract class ReadonlyRepository<TEntity, TPrimaryKey> :
        IReadonlyRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        protected readonly IOtusContextFactory _factory;
        private readonly string _tableName;

        public ReadonlyRepository(IOtusContextFactory factory, string tableName)
        {
            _factory = factory;
            _tableName = tableName;
        }

        public Task<TEntity?> GetAsync(TPrimaryKey id, CancellationToken cancellationToken = default)
        {
            return _factory.Get().QueryAsync<TEntity?>(f =>
            {
                var queryArgs = new { Id = id };
                return f.QueryFirstOrDefaultAsync<TEntity>($"SELECT * FROM {_tableName} WHERE \"Id\" = @Id",queryArgs);
            });
        }

        public Task<IEnumerable<TEntity>> ListAsync(CancellationToken cancellationToken)
        {
            return _factory.Get().QueryAsync<IEnumerable<TEntity>>(f =>
            {
                return f.QueryAsync<TEntity>($"SELECT * FROM {_tableName}");
            });
        }

        public Task<IEnumerable<TEntity>> ListWhereAsync(string[] names, object item, CancellationToken cancellationToken = default)
        {
            var args = string.Join(" and ", names.Select(k => $"\"{k}\" = @{k}"));

            string commandText = $"SELECT * FROM {_tableName} WHERE {args};";
            return _factory.Get().QueryAsync(f =>
            {
                return f.QueryAsync<TEntity>(commandText,item);
            });
        }

        public Task<IEnumerable<TEntity>> SelectLikeAsync(string[] names, object item, CancellationToken cancellationToken = default)
        {
            var args = string.Join($" and ", names.Select(k => $"\"{k}\" ILIKE @{k}"));
            string commandText = $"SELECT * FROM {_tableName} WHERE {args};";
            return _factory.Get().QueryAsync(f => f.QueryAsync<TEntity>(commandText,item));
        }
    }
}
