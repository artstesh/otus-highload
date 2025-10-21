using Fields.Application.Repositories;
using Fields.Entities;
using Microsoft.Extensions.Logging;

namespace Fields.Application.Services;

public interface IFieldService
{
    Task<Guid?> Add(Field field);
    Task<Field> Get(Guid fieldId);
}

public class FieldService : IFieldService
{
    private readonly ILogger<IFieldService> _logger;
    private IFieldRepository _repository;

    public FieldService(ILogger<IFieldService> logger, IFieldRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    public async Task<Guid?> Add(Field field)
    {
        var createdId = await _repository.Add(field);
        return createdId;
    }

    public Task<Field> Get(Guid fieldId)
    {
        return _repository.Get(fieldId);
    }
}
