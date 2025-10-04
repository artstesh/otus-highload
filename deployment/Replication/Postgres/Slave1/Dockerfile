FROM postgres:14

# Копируем скрипты инициализации
COPY init-scripts/ /docker-entrypoint-initdb.d/

# Даем права на выполнение
RUN chmod +x /docker-entrypoint-initdb.d/*.sh
