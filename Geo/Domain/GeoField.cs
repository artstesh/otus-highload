using Common.DataAccess;

namespace Geo.Entities;

public class GeoField: IEntity<Guid>
{
    public Guid Id { get; set; }
    public required Guid RegionId { get; set; }
    public string Wkt { get; set; }
    public double Lat { get; set; }
    public double Lon { get; set; }
}
