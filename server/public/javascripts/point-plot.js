var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
var sz_slider = document.getElementById("size");
var march_slider = document.getElementById("marchers");
var march_num = document.getElementById("m_num");
var draw_size = 10;

import {socket, emission, get_coords} from './sock-share.js'

var orig_coords = null;
var filtered_coords = null;

function draw_pts(sz, coords){
  for ( var i = 0; i < coords.length; i++ ){
    ctx.fillRect(coords[i][0], coords[i][1], sz, sz); // fill in the pixel at (10,10)
  }
}

function set_coords(arr){
  orig_coords = arr;
  filter_coords(1);
}

function redraw(sz, fc){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  draw_pts(sz, fc);
}

// Update the current slider value (each time you drag the slider handle)
sz_slider.oninput = function() {
  draw_size = this.value
  redraw(draw_size, filtered_coords);
}

function filter_coords(v){
  filtered_coords = orig_coords.filter(_ => Math.floor(Math.random() * v) == 0);
  march_num.innerHTML = 'Number of marchers: ' + filtered_coords.length
}

march_slider.oninput = function() {
  filter_coords(this.value);
  redraw(draw_size, filtered_coords);
}

export {set_coords, redraw}