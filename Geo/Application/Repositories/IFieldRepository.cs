using Geo.Entities;

namespace Geo.Application.Repositories;

public interface IFieldRepository
{
    Task<Guid?> Add(GeoField field, CancellationToken tkn);
    Task<IEnumerable<GeoField>> Get(double[] extent, int zoom, CancellationToken tkn);
}
