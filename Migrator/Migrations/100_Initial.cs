using AgroPlatform.Migrator.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fields.Entities;
using FluentMigrator;
using Geo.Entities;

namespace AgroPlatform.Migrator.Migrations
{
    [Migration(100)]
    public class Initial : Migration
    {
        private readonly FieldService _fieldService;
        private readonly GeoService _geoService;
        private readonly int NumberOfFields = 100000;

        public Initial(
                FieldService fieldService,
                GeoService geoService
            )
        {
            _fieldService = fieldService;
            _geoService = geoService;
        }

        public override void Up()
        {
            Task.WaitAll(Task.Run(async () =>
            {
                var regions =await  _geoService.GetRegions();
                var fields = new List<Field>(NumberOfFields);

                foreach (var region in regions)
                {
                    fields.AddRange(new FarmFieldGenerator(region.Wkt).GenerateBulk(NumberOfFields/regions.Count)
                        .Select(s => new Field{Id = Guid.NewGuid(), Wkt = s, RegionId = region.Id}));
                }

                await _fieldService.CreateFieldsAsync(fields);
                await _fieldService.Reset();
            }));
        }

        public override void Down()
        {

        }
    }
}
