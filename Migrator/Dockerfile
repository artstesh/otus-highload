FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Migrator/Platform.Migrator.csproj", "Migrator/"]
COPY ["Common/Http/Common.Http/Common.Http.csproj", "Common/Http/Common.Http/"]
COPY ["Geo/Domain/Geo.Entities.csproj", "Geo/Domain/"]
COPY ["Common/DataAccess/Common.DataAccess/Common.DataAccess.csproj", "Common/DataAccess/Common.DataAccess/"]
COPY ["Fields/Domain/Fields.Entities.csproj", "Fields/Domain/"]
COPY ["Fields/Host/Fields.Api.csproj", "Fields/Host/"]
COPY ["Fields/Application/Fields.Application.csproj", "Fields/Application/"]
COPY ["Fields/Infrastructure/Fields.DataAccess/Fields.DataAccess.csproj", "Fields/Infrastructure/Fields.DataAccess/"]
COPY ["Common/Utility/Common.Utility.csproj", "Common/Utility/"]
COPY ["Fields/Contracts/Fields.Contracts.csproj", "Fields/Contracts/"]
COPY ["Fields/Infrastructure/Fields.Registry/Fields.Registry.csproj", "Fields/Infrastructure/Fields.Registry/"]
RUN dotnet restore "Migrator/Platform.Migrator.csproj"
COPY . .
WORKDIR "/src/Migrator"
RUN dotnet build "./Platform.Migrator.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Platform.Migrator.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Platform.Migrator.dll"]
