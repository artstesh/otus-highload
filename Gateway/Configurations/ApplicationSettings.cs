using System;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace Gateway.Configurations;

public sealed class ApplicationSettings
{
    [NotNull] public required Application AppSettings { get; init; }

    [SetsRequiredMembers]
    private ApplicationSettings()
    {
        AppSettings = new Application();
    }

    public ApplicationSettings Construct(IConfiguration configuration)
    {
        configuration.GetSection(Application.Name).Bind(AppSettings);
        return this;
    }

    [NotNull] public static ApplicationSettings Instance { get; } = new ApplicationSettings();
}

public class Application
{
    public const string Name = "Application";
    public Endpoints Endpoints { get; set; }
    public Authority Authority { get; set; }
}

public class Authority
{
    public string EncryptionKey { get; set; }
    public string Issuer { get; set; }
    public string[] IssuersList() => JsonSerializer.Deserialize<string[]>(Issuer);

    public byte[] EncryptionKey64() => Convert.FromBase64String(EncryptionKey);
}

public class Endpoints
{
    public string Identity { get; set; }
    public string Permissions { get; set; }
    public string Origins { get; set; }
    public string Logging { get; set; }

    public string[] OriginsList() => JsonSerializer.Deserialize<string[]>(Origins);
}