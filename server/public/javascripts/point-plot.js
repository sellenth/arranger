var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
var sz_slider = document.getElementById("size");
var march_slider = document.getElementById("marchers");
var draw_size = 10;

import {socket, emission, get_coords} from './sock-share.js'

var orig_coords = null;
var filtered_coords = null;
/*
var coords = [[37, 3],
[183, 88],
[184, 89],
[186, 90],
[187, 90],
[188, 90],
[189, 90]
]
*/


function draw_pts(sz, coords){
  for ( var i = 0; i < coords.length; i++ ){
    var x = coords[i].split(' ')[0]
    var y = coords[i].split(' ')[1]
    ctx.fillRect(x * 4,y * 4,sz,sz); // fill in the pixel at (10,10)
  }
}

function redraw(sz){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  draw_pts(sz, filtered_coords);

}

// Update the current slider value (each time you drag the slider handle)
sz_slider.oninput = function() {
  orig_coords = get_coords();
  //filtered_coords = orig_coords;
  draw_size = this.value
  redraw(draw_size);
}

function filter_coords(v){
  filtered_coords = [];
  for ( var i = 0; i < orig_coords.length; i++ ){
    var ticket = Math.floor(Math.random() * v);
    if (ticket == 0){
      filtered_coords.push(orig_coords[i]);
    }
  }
  console.log(filtered_coords);
}

march_slider.oninput = function() {
  filter_coords(this.value);
  redraw(draw_size);
}
