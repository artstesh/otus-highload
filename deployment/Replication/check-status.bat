@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

title PostgreSQL Replication Status
color 0A

echo ===============================================
echo    ������ ���������� POSTGRESQL
echo ===============================================
echo ����� ��������: %date% %time%
echo.

:: ������� �������� ����������
call :check_container postgres
set MASTER_STATUS=!errorlevel!

call :check_container postgres-slave1
set SLAVE1_STATUS=!errorlevel!

call :check_container postgres-slave2
set SLAVE2_STATUS=!errorlevel!

echo.
echo ===============================================
echo.

:: �������� �������
if !MASTER_STATUS! == 0 (
    echo [?] MASTER - postgres
    docker exec postgres psql -U postgres -d postgres -c "SELECT application_name,client_addr,state,sync_state,write_lag,flush_lag,replay_lag FROM pg_stat_replication;"
    echo.
) else (
    echo [?] MASTER - postgres - ��������� �� �������
    echo.
)

:: �������� slave1
if !SLAVE1_STATUS! == 0 (
    echo [?] SLAVE1 - postgres-slave1
    docker exec postgres-slave1 psql -U postgres -d postgres -c "SELECT pg_is_in_recovery() as is_in_recovery,pg_last_wal_receive_lsn() as receive_lsn,pg_last_wal_replay_lsn() as replay_lsn,pg_last_xact_replay_timestamp() as replay_timestamp;"
    echo.
) else (
    echo [?] SLAVE1 - postgres-slave1 - ��������� �� �������
    echo.
)

:: �������� slave2
if !SLAVE2_STATUS! == 0 (
    echo [?] SLAVE2 - postgres-slave2
    docker exec postgres-slave2 psql -U postgres -d postgres -c "SELECT pg_is_in_recovery() as is_in_recovery,pg_last_wal_receive_lsn() as receive_lsn,pg_last_wal_replay_lsn() as replay_lsn,pg_last_xact_replay_timestamp() as replay_timestamp;"
    echo.
) else (
    echo [?] SLAVE2 - postgres-slave2 - ��������� �� �������
    echo.
)

:: �������������� ����������
echo ===============================================
echo �������������� ����������:
echo.

if !MASTER_STATUS! == 0 (
    echo ������� LSN �������:
    docker exec postgres psql -U postgres -d postgres -t -c "SELECT pg_current_wal_lsn() as current_lsn_master;"
    echo.
)

if !SLAVE1_STATUS! == 0 (
    echo ����� ���������� �� �������:
    docker exec postgres psql -U postgres -d postgres -t -c "SELECT slot_name, active, restart_lsn FROM pg_replication_slots;" 2>nul
    echo.
)

echo ===============================================
echo �������� ��������� �: %date% %time%
pause
goto :eof

:: ������� �������� ����������
:check_container
docker ps --format "table {{.Names}}" | findstr "%1" >nul
if %errorlevel% == 0 (
    exit /b 0
) else (
    exit /b 1
)
