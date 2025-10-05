#!/bin/bash
set -e

echo "Setting up master PostgreSQL..."

# Creating of a custom setting
cat >> /var/lib/postgresql/data/postgresql.conf << EOF

# Settings
wal_level = replica
max_wal_senders = 10
max_replication_slots = 5
hot_standby = on
archive_mode = on
archive_command = 'cd .'
listen_addresses = '*'
EOF

echo "Master is ready for replication"
