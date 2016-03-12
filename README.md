#Realtime Traffic Map
####By Zaid Daba'een.

![realtime](http://static.z-proj.com/realtime.png)

Showcase your realtime traffic on an AmCharts map through a production-level data pipeline using Apache Kafka.

Live demo: [realtime.z-proj.com](http://realtime.z-proj.com)

# Installation and starting

```sh
# If JAVA is not installed
sudo apt-get install default-jre

# If ZooKeeper is not installed
sudo apt-get install zookeeperd

sudo npm i -g kafka-node
./kafka/start.sh
npm start
```

# Stopping

```sh
./kafka/stop.sh
```

#Techstack

- node.js
- Apache Kafka
- Redis Pub/Sub, kafka-node
- express
- socket.io
- amcharts


