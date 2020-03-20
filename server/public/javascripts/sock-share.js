var socket = io();
var coords = null;

function emission(msg){
  socket.emit('pic_dat', msg);
}

function get_from_db(){
  socket.emit('arr_req');
}

import {set_coords, redraw} from './point-plot.js'

socket.on('server_msg', function(m){
  $('#toast-success').toast('show');
  $('.toast-body').html("Your arrangement has been received.");
  $('#spinner').toggle();
});

function str_to_arr(arr){
  arr = arr.slice(1,-1);
  arr = arr.split(',');
  return arr;
}

import {update_view} from './load.js'

socket.on('get_res', function(d){
  update_view(str_to_arr(d));
});

function get_coords(){
  return coords;
}

export {socket, emission, get_coords, get_from_db};
