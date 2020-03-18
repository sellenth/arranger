var socket = io();
var coords = null;

function emission(msg){
  socket.emit('pic_dat', msg);
}

import {set_coords, redraw} from './point-plot.js'

socket.on('server_msg', function(m){
  $('#toast-success').toast('show');
  $('.toast-body').html("Your arrangement has been received.");
  $('#spinner').toggle();
});

function get_coords(){
  return coords;
}

export {socket, emission, get_coords};
