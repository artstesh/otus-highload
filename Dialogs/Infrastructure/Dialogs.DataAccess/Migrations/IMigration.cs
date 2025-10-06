namespace Dialogs.DataAccess.Migrations;

public abstract class IMigration
{
    protected Guid MigrationId;
    public abstract void Migrate(string connectionString);
}
