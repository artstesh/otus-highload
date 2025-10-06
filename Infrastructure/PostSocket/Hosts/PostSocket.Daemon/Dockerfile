FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Infrastructure/PostSocket/Hosts/PostSocket.Daemon/PostSocket.Daemon.csproj", "Infrastructure/PostSocket/Hosts/PostSocket.Daemon/"]
COPY ["Infrastructure/PostSocket/Application/PostSocket.AppServices/PostSocket.AppServices.csproj", "Infrastructure/PostSocket/Application/PostSocket.AppServices/"]
COPY ["Common/Contracts/Common.Contracts/Common.Contracts.csproj", "Common/Contracts/Common.Contracts/"]
COPY ["Infrastructure/PostSocket/Infrastructure/PostSocket.Registry/PostSocket.Registry.csproj", "Infrastructure/PostSocket/Infrastructure/PostSocket.Registry/"]
RUN dotnet restore "Infrastructure/PostSocket/Hosts/PostSocket.Daemon/PostSocket.Daemon.csproj"
COPY . .
WORKDIR "/src/Infrastructure/PostSocket/Hosts/PostSocket.Daemon"
RUN dotnet build "./PostSocket.Daemon.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PostSocket.Daemon.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PostSocket.Daemon.dll"]
