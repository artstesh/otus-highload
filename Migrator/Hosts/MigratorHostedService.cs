using System;
using System.Threading;
using System.Threading.Tasks;
using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AgroPlatform.Migrator.Hosts
{
    public class MigratorHostedService : BackgroundService
    {
        private readonly ILogger<MigratorHostedService> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public MigratorHostedService(
            IServiceScopeFactory serviceScopeFactory,
            ILogger<MigratorHostedService> logger)
        {
            (_serviceScopeFactory, _logger) = (serviceScopeFactory, logger);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                UpdateDatabase(scope.ServiceProvider);
            }

            return Task.CompletedTask;
        }

        private void UpdateDatabase(IServiceProvider serviceProvider)
        {
            // Instantiate the runner
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
            // Execute the migrations
            runner.MigrateUp();
        }
    }
}
