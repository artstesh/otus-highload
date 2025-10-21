using Geo.Application.Repositories;
using Geo.Entities;
using Microsoft.Extensions.Logging;

namespace Geo.Application.Services;

public interface IFieldService
{
    Task<Guid?> Add(GeoField field, CancellationToken tkn);
    Task<IEnumerable<GeoField>> Get(double[] extent, int zoom, CancellationToken tkn);
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

    public async Task<Guid?> Add(GeoField field, CancellationToken tkn)
    {
        var createdId = await _repository.Add(field,tkn);
        return createdId;
    }

    public Task<IEnumerable<GeoField>> Get(double[] extent, int zoom, CancellationToken tkn)
    {
        return _repository.Get(extent, zoom, tkn);
    }
}
