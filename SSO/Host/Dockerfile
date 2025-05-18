FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SSO/Host/OtusHighload.Api.csproj", "SSO/Host/"]
COPY ["SSO/Domain/OtusHighload.Entities/OtusHighload.Entities.csproj", "SSO/Domain/OtusHighload.Entities/"]
COPY ["Common/DataAccess/Common.DataAccess/UZ.DataAccess.csproj", "Common/DataAccess/Common.DataAccess/"]
COPY ["SSO/Application/OtusHighload.Services/OtusHighload.Application.csproj", "SSO/Application/OtusHighload.Services/"]
COPY ["Common/Utility/Common.Utility.csproj", "Common/Utility/"]
COPY ["SSO/Infrastructure/OtusHighload.DataAccess/OtusHighload.DataAccess.csproj", "SSO/Infrastructure/OtusHighload.DataAccess/"]
COPY ["SSO/Infrastructure/OtusHighload.Registry/OtusHighload.Registry.csproj", "SSO/Infrastructure/OtusHighload.Registry/"]
RUN dotnet restore "SSO/Host/OtusHighload.Api.csproj"
COPY . .
WORKDIR "/src/SSO/Host"
RUN dotnet build "OtusHighload.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "OtusHighload.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OtusHighload.Api.dll"]
