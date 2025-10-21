# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets
# Name the node stage "builder"
FROM node:18.20.4 AS builder
# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
ARG ENV=Development
RUN if [ "$ENV" = "Development" ] ; then npm install && npm run build; fi
RUN if [ "$ENV" = "Staging" ] ; then npm install && npm run build:staging; fi
RUN if [ "$ENV" = "PredProd" ] ; then npm install && npm run build:predprod; fi
RUN if [ "$ENV" = "Production" ] ; then npm install && npm run build:prod; fi

# nginx state for serving content
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist/Otus .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
