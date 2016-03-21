const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Run server to listen on port 3005.
const server = app.listen(3005, () => {
  console.log('Listening on http://localhost:3005')
})

const kafka = require('kafka-node')
const client = new kafka.Client('127.0.0.1:2181')
const producer = new kafka.Producer(client, {requireAcks: 1})

const redisAdapter = require('socket.io-redis')
const io = require('socket.io')(server)

io.adapter(redisAdapter({host: 'localhost', port: 6379, scope: 'realtime'}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('static'))

// Set Express routes.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

function autoGenerate () {
  var random_time = Math.random() * 1000
  setTimeout(function () {
    sendTraffic((Math.random() * 360) - 180, (Math.random() * 180) - 90)
    autoGenerate()
  }, random_time)
}

function recieveTraffic () {
  var consumer = new kafka.Consumer(client, [{topic: 'maptraffic', partition: 0}], {autoCommit: false})
  var offset = new kafka.Offset(client)

  consumer.on('offsetOutOfRange', function (topic) {
    topic.maxNum = 2
    offset.fetch([topic], function (err, offsets) {
      if (err) {
        console.log(err)
        return
      }
      var min = Math.min.apply(null, offsets[topic.topic][topic.partition])
      consumer.setOffset(topic.topic, topic.partition, min)
    })
  })

  consumer.on('message', function (message) {
    io.emit('event', JSON.parse(message.value))
  })
}

function sendTraffic (lng, lat) {
  var event = JSON.stringify({lng: lng, lat: lat})

  producer.send([
    {topic: 'maptraffic', messages: [event]}
  ], function (err, result) {
    if (err) {
      console.log(err)
      return
    }
  })
}

producer.on('ready', function () {
  producer.createTopics(['maptraffic'], false, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    console.log(data)
    recieveTraffic()
    autoGenerate()
  })
})
