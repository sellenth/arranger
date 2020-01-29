var socket = io();
var coords = null;

function emission(msg){
  socket.emit('pic_dat', msg);
}

socket.on('server_msg', function(m){
  coords = m;
});

function get_coords(){
  return coords;
}

export {socket, emission, get_coords};
