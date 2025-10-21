namespace Common.DataAccess;

public abstract class IMigration
{
    protected Guid MigrationId;
    public abstract void Migrate();
}
