using Common.DataAccess;
using Common.Utility;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OtusHighload.Application.Repositories;
using OtusHighload.Application.Services;
using OtusHighload.DataAccess.Repositories;

namespace OtusHighload.Registry
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSso(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IPostRepository, PostRepository>()
                .AddScoped<IFriendRepository, FriendRepository>()
                .AddScoped<IUserService, UserService>()
                .AddScoped<IPostService, PostService>()
                .AddSingleton<ITokenCryptoService, TokenCryptoService>(e => new TokenCryptoService(configuration.GetValue<string>("Security:EncryptionKey")))
                .AddScoped<IFriendshipService, FriendshipService>()
                .AddScoped<IFeedCacheService, FeedCacheService>()
                .AddScoped<ICacheRebuildService, CacheRebuildService>()
                .AddScoped<IMessageBusService, RabbitMQService>()
                .AddTransient<RequestIdLoggingMiddleware>()
                .AddScoped<IRequestContext, RequestContext>()
                .AddSingleton<IOtusContextFactory, OtusContextFactory>(p =>
                    new OtusContextFactory(configuration.GetConnectionString("DefaultConnection")!));

            return services;
        }
    }
}
