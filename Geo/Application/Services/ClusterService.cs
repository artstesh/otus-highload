using Geo.Application.Repositories;
using Geo.Entities;
using Microsoft.Extensions.Logging;

namespace Geo.Application.Services;

public interface IClusterService
{
    Task<IEnumerable<FieldCluster>> Get(double[] extent, CancellationToken tkn);
    Task Reset();
}

public class ClusterService : IClusterService
{

    private readonly ILogger<IFieldService> _logger;
    private IClusterRepository _repository;

    public ClusterService(ILogger<IFieldService> logger, IClusterRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    public Task<IEnumerable<FieldCluster>> Get(double[] extent, CancellationToken tkn)
    {
        return _repository.Get(extent,tkn);
    }

    public Task Reset()
    {
        return _repository.Reset();
    }
}
