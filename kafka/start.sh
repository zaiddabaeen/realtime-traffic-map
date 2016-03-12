#!/bin/sh

BASEDIR=$(dirname "$0")

nohup $BASEDIR/bin/kafka-server-start.sh $BASEDIR/config/server.properties > $BASEDIR/kafka.log 2>&1 &
echo "Started Kafka server"