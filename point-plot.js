var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
var slider = document.getElementById("myRange");

import coords from './sock-share.js'

/*
var coords = [[37, 3],
[38, 3],
[39, 3],
[7, 6],
[8, 6],
[45, 6],
[18, 7],
[45, 7],
]
*/


function draw_pts(sz){
  for ( var i = 0; i < coords.length; i++ )
    ctx.fillRect(coords[i][0] * 2,coords[i][1] * 2,sz,sz); // fill in the pixel at (10,10)
  
}

function redraw(sz){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  draw_pts(sz);

}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  redraw(this.value);
}
