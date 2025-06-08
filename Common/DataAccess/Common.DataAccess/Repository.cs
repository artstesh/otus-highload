using System.Transactions;
using Common.DataAccess;
using Dapper;
using Npgsql;
using OtusHighload.DataAccess;

namespace Common.DataAccess
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

        public Task<Guid?> CreateAsync(string[] names, object item, CancellationToken cancellationToken)
        {
            var keys = string.Join(",", names.Select(k => $"\"{k}\""));
            var args = string.Join(", ", names.Select(k => $"@{k}"));
            string commandText = $"INSERT INTO {_tableName} ({keys}) VALUES ({args}) RETURNING \"Id\"";
            return _factory.Get().QueryAsync<Guid?>(f =>
            {
                return f.QueryFirstOrDefaultAsync<Guid?>(commandText, item);
            });
        }

        public Task BulkCreateAsync(string[] names, List<object> items, CancellationToken cancellationToken)
        {
            var keys = string.Join(",", names.Select(k => $"\"{k}\""));
            var args = string.Join(", ", names.Select(k => $"@{k}"));
            return _factory.Get().ExecuteAsync(f =>
            {
                using (var tran = f.BeginTransaction())
                {
                    foreach (object item in items)
                        f.Execute($"INSERT INTO {_tableName} ({keys}) VALUES ({args})", item);

                    tran.Commit();
                }

                return Task.CompletedTask;
            });
        }

        public Task<int> UpdateAsync(string[] names, object item, CancellationToken token)
        {
            var args = string.Join(",", names.Select(k => $"\"{k}\" = @{k.ToLower()}"));

            string commandText = $"UPDATE {_tableName} SET (${args});";
            return _factory.Get().QueryAsync(f => { return f.ExecuteAsync(commandText, item); });
        }

        public Task<int> DeleteAsync(TEntity id, CancellationToken cancellationToken)
        {
            var args = new { id = id };
            string commandText = $"DELETE FROM {_tableName} WHERE \"Id\" = @id;";
            return _factory.Get().QueryAsync(f => { return f.ExecuteAsync(commandText, args); });
        }
    }
}
