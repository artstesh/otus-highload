using System.Text.Json;
using System.Text.RegularExpressions;
using Common.Security;
using Gateway.Configurations;
using IdentityModel.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Provider.Polly;
using OpenIddict.Validation.AspNetCore;

namespace Gateway
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ApplicationSettings.Instance.Construct(Configuration);
            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue;
            });
            services.AddAuthentication(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
            services.AddAuthorization();
            services
                .AddControllers()
                .AddDataAnnotationsLocalization();
            services.AddOpenId(Configuration);
            services.AddAccessTokenManagement(options =>
            {
                options.Client.Clients.Add("inner.service",
                    new ClientCredentialsTokenRequest
                    {
                        Address = $"{ApplicationSettings.Instance.AppSettings.Endpoints.Identity}/connect/token",
                        ClientId = "inner.service",
                        ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB342"
                    });
            }).ConfigureBackchannelHttpClient();

            services.AddHealthChecks();
            services.AddOcelot().AddPolly();
            services.AddSwaggerServices(Configuration);
            // This is needed, when the app is hosted behind a reverse proxy,
            // to restore the original values in the RemoteIpAddress,
            // Scheme, and Host properties of the HttpContext.Requeset object.
            // Find more information here: https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/proxy-load-balancer?view=aspnetcore-5.0
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor
                    | ForwardedHeaders.XForwardedProto
                    | ForwardedHeaders.XForwardedHost;
                // Only loopback proxies are allowed by default.
                // Clear that restriction because forwarders are enabled by explicit
                // configuration.
                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                    .WithOrigins(ApplicationSettings.Instance.AppSettings.Endpoints.OriginsList())
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                );
            });
            services.AddSecurity();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app
                .UseCors("CorsPolicy")
                .UseForwardedHeaders();
            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                app.UseHsts();
            app
                .UseHealthChecks(new PathString("/hc"))
                .UseRouting();
            app.UseAuthentication()
                .UseAuthorization();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGet("/", async context => { await context.Response.WriteAsync(string.Empty); });
            });
            app.UseSwaggerForOcelotUI(options =>
            {
                options.ReConfigureUpstreamSwaggerJson = (context, s) =>
                {
                    // ToDo move to a separate location
                    return Regex.Replace(JsonSerializer.Serialize(JsonSerializer.Deserialize<dynamic>(s)),
                        @"\{[^{]+""x-user-id""[^}]+\}\},?", "");
                };
            });
            app.UseSecurity(env);
            app.UseWebSockets()
                .UseOcelot()
                .Wait();
        }
    }
}
