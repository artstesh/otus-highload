using FluentMigrator.Runner.VersionTableInfo;

namespace AgroPlatform.Migrator
{
    [VersionTableMetaData]
    public class VersionTable : DefaultVersionTableMetaData
    {
        public override string SchemaName => "migrator";
    }
}