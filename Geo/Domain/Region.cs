using Common.DataAccess;

namespace Geo.Entities;

public class Region: IEntity<Guid>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Wkt { get; set; }
}
