#!/bin/bash
set -e

echo "Настройка slave1 сервера..."

# Ждем доступности мастера
echo "Ожидание доступности мастера..."
until pg_isready -h postgres -p 5432 -U postgres; do
  sleep 2
done

echo "Мастер доступен, начинаем настройку репликации..."

# Останавливаем PostgreSQL если запущен
pg_ctl -D "$PGDATA" -m fast -w stop

# Очищаем data directory
rm -rf "$PGDATA"/*

# Создаем базовую резервную копию с мастера
echo "Создание базовой резервной копии с мастера..."
PGPASSWORD=replica_password pg_basebackup -h postgres -p 5432 -U replica_user -D "$PGDATA" -Fp -Xs -P -R -S replica_slot1

# Создаем файл standby сигнала
touch "$PGDATA/standby.signal"

# Запускаем PostgreSQL
pg_ctl -D "$PGDATA" -w start

echo "Slave1 настроен и запущен как реплика"
