#!/bin/bash
set -e

echo "Creating of a replication's user..."

until pg_isready -U postgres; do
  sleep 1
done

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE USER replica_user WITH REPLICATION ENCRYPTED PASSWORD 'replica_password';
    SELECT pg_create_physical_replication_slot('replica_slot1');
    SELECT pg_create_physical_replication_slot('replica_slot2');
EOSQL

echo "The user replica_user has been created"
