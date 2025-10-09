FROM nginx:1.28-alpine

# Устанавливаем необходимые пакеты
RUN apk update && apk add --no-cache \
    openssl \
    bash

RUN mkdir -p /etc/nginx/ssl

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx-selfsigned.crt /etc/nginx/ssl
COPY ./nginx/nginx-selfsigned.key /etc/nginx/ssl
RUN chmod +x /etc/nginx/ssl/nginx-selfsigned.crt
RUN chmod +x /etc/nginx/ssl/nginx-selfsigned.key


HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f https://localhost/health || exit 1

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
