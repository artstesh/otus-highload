using Dapper;
using Npgsql;
using OtusHighload.DataAccess;

namespace UZ.DataAccess
{
    public abstract class Repository<TEntity, TPrimaryKey> : ReadonlyRepository<TEntity, TPrimaryKey>,
        IRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        private readonly string _tableName;
        public Repository(IOtusContextFactory factory, string tableName) : base(factory, tableName)
        {
            _tableName = tableName;
        }

        public Task<int> CreateAsync(string[] names, object item, CancellationToken cancellationToken)
        {
            var keys = string.Join(",", names.Select(k => $"\"{k}\""));
            var args = string.Join(", ", names.Select(k => $"@{k}"));
            string commandText = $"INSERT INTO {_tableName} (${keys}) VALUES ({args})";
            return _factory.Get().QueryAsync(f =>
            {
                return f.ExecuteAsync(commandText,item);
            });
        }

        public Task<int> UpdateAsync(string[] names, object item, CancellationToken token)
        {
            var args = string.Join(",", names.Select(k => $"\"{k}\" = @{k.ToLower()}"));

            string commandText = $"UPDATE {_tableName} SET (${args});";
            return _factory.Get().QueryAsync(f =>
            {
                return f.ExecuteAsync(commandText,item);
            });
        }

        public Task<int> DeleteAsync(string id, CancellationToken cancellationToken)
        {
            string commandText = $"DELETE FROM {_tableName} WHERE \"Id\" = '${id}';";
            return _factory.Get().QueryAsync(f =>
            {
                return f.ExecuteAsync(commandText);
            });
        }
    }
}
