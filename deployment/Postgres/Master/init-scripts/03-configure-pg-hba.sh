#!/bin/bash
set -e

echo "Setting up pg_hba.conf..."

until pg_isready -U postgres; do
  sleep 1
done

# Update pg_hba.conf
cat >> /var/lib/postgresql/data/pg_hba.conf << EOF

# Allow all hosts in Docker
host    replication     replica_user     0.0.0.0/0               md5
host    all             replica_user     0.0.0.0/0               md5

# Allow all connections
host    all             all              0.0.0.0/0               md5
EOF

# Resetting config
psql -v ON_ERROR_STOP=1 --username "postgres" -c "SELECT pg_reload_conf();"

echo "pg_hba.conf has been set up"
