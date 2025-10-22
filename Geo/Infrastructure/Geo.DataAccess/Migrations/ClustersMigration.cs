using Common.DataAccess;
using Dapper;

namespace Geo.DataAccess.Migrations;

public class ClustersMigration: IMigration
{
    private readonly IOtusContextFactory _factory;

    public ClustersMigration(IOtusContextFactory contextFactory)
    {
        _factory = contextFactory;
        MigrationId = Guid.Parse("8700C6FD-B1EB-4FBC-B348-0068BA36A67B");
    }

    public override void Migrate()
    {
        var exists = _factory.Get().Query<int>(conn =>
        {
            return conn.QueryFirst<int>($"select count(*) from \"Migrations\" where id = '{MigrationId}'");
        }) > 0;

        if (exists) return;

        _factory.Get().Execute(conn =>
            conn.Execute(
                @"DROP INDEX IF EXISTS idx_clusters_point;
drop materialized view if exists field_clusters;
create materialized view field_clusters as
SELECT st_centroid(st_collect(clusters.point)) AS point,
       count(clusters.cid)                     AS count,
clusters.region_id as regionId
FROM (SELECT fields.point,fields.region_id,
             st_clusterdbscan(fields.point, 0.0075::double precision, 1) OVER (PARTITION BY fields.region_id) AS cid
      FROM fields) clusters
GROUP BY clusters.cid, regionId;

                  CREATE INDEX idx_clusters_point ON field_clusters USING GIST(point);"));
        _factory.Get().Execute(conn => conn.Execute($"insert into \"Migrations\" (id) values ('{MigrationId}');"));
    }
}
