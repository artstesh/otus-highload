using Common.DataAccess;

namespace Fields.Entities;

public class Field : IEntity<Guid>
{
    public Guid Id { get; set; }
    public Guid RegionId { get; set; }
    public string Wkt { get; set; }
}
