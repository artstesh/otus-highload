FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 443
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Geo/Host/Geo.Api.csproj", "Geo/Host/"]
COPY ["Geo/Application/Geo.Application.csproj", "Geo/Application/"]
COPY ["Geo/Domain/Geo.Entities.csproj", "Geo/Domain/"]
COPY ["Common/DataAccess/Common.DataAccess/Common.DataAccess.csproj", "Common/DataAccess/Common.DataAccess/"]
COPY ["Geo/Infrastructure/Geo.Registry/Geo.Registry.csproj", "Geo/Infrastructure/Geo.Registry/"]
COPY ["Common/Utility/Common.Utility.csproj", "Common/Utility/"]
COPY ["Geo/Infrastructure/Geo.DataAccess/Geo.DataAccess.csproj", "Geo/Infrastructure/Geo.DataAccess/"]
RUN dotnet restore "Geo/Host/Geo.Api.csproj"
COPY . .
WORKDIR "/src/Geo/Host"
RUN dotnet build "./Geo.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Geo.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Geo.Api.dll"]
