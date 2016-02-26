var socket = io();
 
socket.on('event', function(msg){
  rtmap.addMarker(msg.lng, msg.lat)
});