using Common.DataAccess;
using Fields.Entities;

namespace Fields.Application.Repositories;

public interface IFieldRepository : IRepository<Field,Guid>
{
    Task<Guid?> Add(Field field);
    Task<Field?> Get(Guid fieldId);
}
