var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
var slider = document.getElementById("myRange");

var coords = [[37, 3],
[38, 3],
[39, 3],
[7, 6],
[8, 6],
[45, 6],
[18, 7],
[45, 7],
[5, 8],
[45, 8],
[45, 9],
[4, 12],
[4, 13],
[44, 14],
[44, 15],
[4, 16],
[3, 19],
[43, 19],
[43, 20],
[3, 22],
[3, 23],
[3, 24],
[4, 27],
[4, 28],
[42, 31],
[5, 34],
[31, 34],
[32, 34],
[33, 34],
[6, 35],
[23, 35],
[24, 35],
[184, 77],
[185, 77],
[188, 77],
[189, 77],
[191, 78],
[192, 79],
[194, 81],
[178, 83],
[194, 84],
[179, 86],
[183, 88],
[184, 89],
[186, 90],
[187, 90],
[188, 90],
[189, 90]
]


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
