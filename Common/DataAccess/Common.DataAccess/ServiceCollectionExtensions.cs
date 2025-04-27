using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace UZ.DataAccess
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDataAccess(this IServiceCollection services, params Assembly[] assemblies)
        {
            foreach (var item in assemblies)
            {
                var repositoryTypes =
                    item.GetTypes()
                        .Where(x =>
                            !x.IsInterface &&
                            x.GetInterface(typeof(IReadonlyRepository<,>).Name) != null
                        );
                foreach (var repositoryType in repositoryTypes)
                {
                    var type = repositoryType.UnderlyingSystemType;
                    var nonGenericInterfaces = type.GetInterfaces().Where(x => !x.IsGenericType);
                    foreach (var nonGenericInterface in nonGenericInterfaces)
                        services.AddScoped(nonGenericInterface, type);
                }
            }

            return services;
        }
    }
}