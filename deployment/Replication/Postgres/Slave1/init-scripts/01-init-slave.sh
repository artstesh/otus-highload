#!/bin/bash
set -e

echo "Setting up the slave1..."

# Stop PostgreSQL
pg_ctl -D "$PGDATA" -m fast -w stop

# Clean data directory
rm -rf "$PGDATA"/*

echo "Pulling from the master..."
until pg_isready -h postgres -p 5432 -U postgres; do
  sleep 5
done
echo "Master is ready, setting up..."
PGPASSWORD=replica_password pg_basebackup -h postgres -p 5432 -U replica_user -D "$PGDATA" -Fp -Xs -P -R -S replica_slot1

# Creating of a standby signal
touch "$PGDATA/standby.signal"

# Up PostgreSQL
pg_ctl -D "$PGDATA" -w start

echo "Slave1 is ready"
