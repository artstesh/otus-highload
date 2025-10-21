using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Gateway.Configurations;

public static class OpenIdConfiguration
{
    public static OpenIddictBuilder AddOpenId(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        return services.AddOpenIddict().AddValidation(configuration);
    }

    private static OpenIddictBuilder AddValidation(this OpenIddictBuilder builder, IConfiguration configuration)
    {
        return builder.AddValidation(options =>
        {
            options.SetIssuer(new Uri(ApplicationSettings.Instance.AppSettings.Endpoints.Identity, UriKind.Absolute));
            options.UseSystemNetHttp();
            options.AddEncryptionKey(
                new SymmetricSecurityKey(ApplicationSettings.Instance.AppSettings.Authority.EncryptionKey64()));
            options.UseAspNetCore();
            options.Configure(o =>
            {
                o.TokenValidationParameters.IssuerValidatorUsingConfiguration =
                    (issuer, token, parameters, baseConfiguration) => { return issuer; };
                o.TokenValidationParameters.IssuerValidator = (issuer, token, parameters) => { return issuer; };
                o.TokenValidationParameters.ValidateIssuer = false;
            });
        });
    }
}