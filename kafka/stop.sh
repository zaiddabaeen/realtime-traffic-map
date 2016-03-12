#!/bin/sh

ps aux | grep -i kafka | awk {'print $2'} | xargs kill -9

echo "Stopped Kafka server"