FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 443
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Fields/Host/Fields.Api.csproj", "Fields/Host/"]
COPY ["Fields/Application/Fields.Application.csproj", "Fields/Application/"]
COPY ["Fields/Domain/Fields.Entities.csproj", "Fields/Domain/"]
COPY ["Common/DataAccess/Common.DataAccess/Common.DataAccess.csproj", "Common/DataAccess/Common.DataAccess/"]
COPY ["Fields/Infrastructure/Fields.DataAccess/Fields.DataAccess.csproj", "Fields/Infrastructure/Fields.DataAccess/"]
COPY ["Common/Utility/Common.Utility.csproj", "Common/Utility/"]
COPY ["Fields/Contracts/Fields.Contracts.csproj", "Fields/Contracts/"]
COPY ["Fields/Infrastructure/Fields.Registry/Fields.Registry.csproj", "Fields/Infrastructure/Fields.Registry/"]
RUN dotnet restore "Fields/Host/Fields.Api.csproj"
COPY . .
WORKDIR "/src/Fields/Host"
RUN dotnet build "./Fields.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Fields.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Fields.Api.dll"]
