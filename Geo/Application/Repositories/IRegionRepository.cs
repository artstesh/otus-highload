using Common.DataAccess;
using Geo.Entities;

namespace Geo.Application.Repositories;

public interface IRegionRepository
{
    Task<Guid?> DefineRegion(string wkt, CancellationToken tkn);
    Task<IEnumerable<Region>> GetRegions(CancellationToken tkn);
}
