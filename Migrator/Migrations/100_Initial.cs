using AgroPlatform.Migrator.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fields.Entities;
using FluentMigrator;
using Geo.Entities;
using Microsoft.Extensions.Configuration;

namespace AgroPlatform.Migrator.Migrations
{
    [Migration(100)]
    public class Initial : Migration
    {
        private readonly FieldService _fieldService;
        private readonly GeoService _geoService;
        private readonly IConfiguration _configuration;
        private int NumberOfFields = 10;

        public Initial(
                FieldService fieldService,
                GeoService geoService,
                IConfiguration configuration
            )
        {
            _fieldService = fieldService;
            _geoService = geoService;
            _configuration = configuration;
        }

        public override void Up()
        {
            NumberOfFields = _configuration.GetValue<int>("Application:FieldNumber");
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
