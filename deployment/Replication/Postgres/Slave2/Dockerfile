FROM postgres:14

COPY init-scripts/ /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/*.sh
