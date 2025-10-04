#!/bin/bash
set -e

echo "Настройка мастер-сервера PostgreSQL..."

# Создаем кастомный конфиг для мастера
cat >> /var/lib/postgresql/data/postgresql.conf << EOF

# Репликация настройки
wal_level = replica
max_wal_senders = 10
max_replication_slots = 5
hot_standby = on
archive_mode = on
archive_command = 'cd .'
listen_addresses = '*'
EOF

echo "Мастер-сервер настроен для репликации"
