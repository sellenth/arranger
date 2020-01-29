var socket = io();
var coords = null;

function emission(msg){
  socket.emit('pic_dat', msg);
}

import {set_coords, draw_pts} from './point-plot.js'

socket.on('server_msg', function(m){
  coords = m;
  set_coords(m);
  draw_pts(10, m);
});

function get_coords(){
  return coords;
}

export {socket, emission, get_coords};
