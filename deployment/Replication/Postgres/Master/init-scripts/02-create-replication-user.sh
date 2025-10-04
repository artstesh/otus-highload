#!/bin/bash
set -e

echo "Создание пользователя репликации..."

# Ждем запуска PostgreSQL
until pg_isready -U postgres; do
  sleep 1
done

# Создаем пользователя и слоты репликации
psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE USER replica_user WITH REPLICATION ENCRYPTED PASSWORD 'replica_password';
    SELECT pg_create_physical_replication_slot('replica_slot1');
    SELECT pg_create_physical_replication_slot('replica_slot2');
EOSQL

echo "Пользователь replica_user и слоты репликации созданы"
