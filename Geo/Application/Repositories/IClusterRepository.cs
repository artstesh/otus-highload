using Geo.Entities;

namespace Geo.Application.Repositories;

public interface IClusterRepository
{
    Task Reset();
    Task<IEnumerable<FieldCluster>> Get(double[] extent, CancellationToken tkn);
}

