FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Dialogs/Host/Dialogs.Api/Dialogs.Api.csproj", "Dialogs/Host/Dialogs.Api/"]
COPY ["Dialogs/Infrastructure/Dialogs.Registry/Dialogs.Registry.csproj", "Dialogs/Infrastructure/Dialogs.Registry/"]
COPY ["Common/DataAccess/Common.DataAccess/Common.DataAccess.csproj", "Common/DataAccess/Common.DataAccess/"]
COPY ["Dialogs/Domain/Dialogs.Entities/Dialogs.Entities.csproj", "Dialogs/Domain/Dialogs.Entities/"]
COPY ["Common/Utility/Common.Utility.csproj", "Common/Utility/"]
COPY ["Dialogs/Infrastructure/Dialogs.DataAccess/Dialogs.DataAccess.csproj", "Dialogs/Infrastructure/Dialogs.DataAccess/"]
COPY ["Dialogs/Contracts/Dialogs.Contracts/Dialogs.Contracts.csproj", "Dialogs/Contracts/Dialogs.Contracts/"]
COPY ["Dialogs/Application/Dialogs.Application/Dialogs.Application.csproj", "Dialogs/Application/Dialogs.Application/"]
RUN dotnet restore "Dialogs/Host/Dialogs.Api/Dialogs.Api.csproj"
COPY . .
WORKDIR "/src/Dialogs/Host/Dialogs.Api"
RUN dotnet build "./Dialogs.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Dialogs.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dialogs.Api.dll"]
