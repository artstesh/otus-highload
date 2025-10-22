FROM postgis/postgis:14-3.5

COPY init-scripts/ /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/*.sh
