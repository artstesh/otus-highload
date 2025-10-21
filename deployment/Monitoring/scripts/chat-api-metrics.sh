#!/bin/bash

case "$1" in
    active_connections)
        # Количество активных подключений к БД
        psql -U your_user -d your_db -c "SELECT count(*) FROM pg_stat_activity WHERE datname = 'postgres';" -t
        ;;
    memory_usage)
        # Использование памяти процессом
        ps -o rss= -p $(pgrep -f "your-api-process")
        ;;
    response_time)
        # Время ответа API
        curl -o /dev/null -s -w '%{time_total}\n' http://localhost:5002/api/users
        ;;
    *)
        echo "Unknown metric"
        exit 1
        ;;
esac
