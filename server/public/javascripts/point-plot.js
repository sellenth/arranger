var canvas = document.getElementById('point');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var sz_slider = document.getElementById("size");
var march_slider = document.getElementById("marchers");
var march_num = document.getElementById("m_num");
var draw_size = 10;

var orig_coords = [];
var filtered_coords = null;

function draw_pts(sz, coords){
  for ( var i = 0; i < coords.length; i++ ){
    ctx.fillRect(Math.floor(coords[i]['x']), Math.floor(coords[i]['y']), sz, sz); // fill in the pixel at (10,10)
  }
}

function set_coords(arr){
  orig_coords = [];
  for (var i = 0; i < arr.length; i++){
    for (var j = 0; j < arr[i].length; j++){
      orig_coords.push(arr[i][j]);
    }
    orig_coords.concat(arr[i]);
  }
  filter_coords(1);
  //console.log(new Blob(filtered_coords, {type : 'application/json'}));
  console.log(JSON.stringify(filtered_coords));
  console.log(canvas.clientWidth);
  console.log(canvas.clientHeight);
  redraw(draw_size, filtered_coords);
}

function redraw(sz, fc){
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  draw_pts(sz, fc);
}

// Update the current slider value (each time you drag the slider handle)
sz_slider.oninput = function() {
  draw_size = this.value;
  redraw(draw_size, filtered_coords);
}

function update_march_num_txt(){
  march_num.innerHTML = 'Number of marchers: ' + filtered_coords.length;
}

function filter_coords(v){
  filtered_coords = orig_coords.filter(_ => Math.floor(Math.random() * v) == 0);
  update_march_num_txt();
}

march_slider.oninput = function() {
  filter_coords(this.value);
  redraw(draw_size, filtered_coords);
}

export {set_coords, redraw}
