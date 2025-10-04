#!/bin/bash
set -e

echo "Настройка pg_hba.conf..."

# Ждем запуска PostgreSQL
until pg_isready -U postgres; do
  sleep 1
done

# Добавляем записи в pg_hba.conf для разрешения репликации
cat >> /var/lib/postgresql/data/pg_hba.conf << EOF

# Разрешение репликации со всех хостов в сети Docker
host    replication     replica_user     0.0.0.0/0               md5
host    all             replica_user     0.0.0.0/0               md5

# Разрешение подключений из docker сети (опционально)
host    all             all              0.0.0.0/0               md5
EOF

# Перезагружаем конфигурацию
psql -v ON_ERROR_STOP=1 --username "postgres" -c "SELECT pg_reload_conf();"

echo "pg_hba.conf успешно настроен"
