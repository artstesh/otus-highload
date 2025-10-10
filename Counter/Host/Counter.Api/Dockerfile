FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Counter/Host/Counter.Api/Counter.Api.csproj", "Counter/Host/Counter.Api/"]
COPY ["Counter/Domain/Counter.Entities/Counter.Entities.csproj", "Counter/Domain/Counter.Entities/"]
COPY ["Common/DataAccess/Common.DataAccess/Common.DataAccess.csproj", "Common/DataAccess/Common.DataAccess/"]
COPY ["Counter/Application/Counter.Application/Counter.Application.csproj", "Counter/Application/Counter.Application/"]
COPY ["Counter/Infrastructure/Counter.Registry/Counter.Registry.csproj", "Counter/Infrastructure/Counter.Registry/"]
COPY ["Counter/Infrastructure/Counter.DataAccess/Counter.DataAccess.csproj", "Counter/Infrastructure/Counter.DataAccess/"]
RUN dotnet restore "Counter/Host/Counter.Api/Counter.Api.csproj"
COPY . .
WORKDIR "/src/Counter/Host/Counter.Api"
RUN dotnet build "./Counter.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Counter.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Counter.Api.dll"]
