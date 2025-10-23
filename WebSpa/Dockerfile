# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets
# Name the node stage "builder"
FROM node:18.20.4 AS builder
# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
COPY dist/Otus/. .
# install node modules and build assets
ARG ENV=Development

# nginx state for serving content
FROM nginx:stable
COPY nginx.conf /etc/nginx/nginx.conf

RUN apt-get update
RUN apt-get install -y openssl
WORKDIR /etc/nginx/certs
RUN openssl genrsa -out localhost.key 2048
RUN openssl req -new -x509 -key localhost.key -out localhost.crt -days 365 -subj "/CN=localhost"

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/. .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
