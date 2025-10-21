namespace Geo.DataAccess.Migrations;

public abstract class IMigration
{
    protected Guid MigrationId;
    public abstract void Migrate();
}
