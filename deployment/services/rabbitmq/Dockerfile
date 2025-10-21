FROM rabbitmq:3-management-alpine AS base

ADD etc/rabbitmq.conf /etc/rabbitmq/
ADD etc/enabled_plugins /etc/rabbitmq/

# TODO bad practice, find a better way
RUN chmod 666 /etc/rabbitmq/rabbitmq.conf
