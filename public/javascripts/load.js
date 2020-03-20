import {get_from_db} from './sock-share.js'
import {redraw} from './point-plot.js'

window.addEventListener('DOMContentLoaded', init, false);

let screen2   = document.getElementById('point');
let btns1     = document.getElementById('btns_screen1')
let btns2     = document.getElementById('btns_screen2')
let get_info_btn  = document.getElementById('get_btn');
let back_btn  = document.getElementById('back_btn');
let toast     = document.getElementById('toast');
let clear_btn = document.getElementById('clear_btn')
let march_num_in = document.getElementById("m_num_in");
var data = [];
var fetched_x;
var fetched_y;

function init() {
  get_from_db();
  get_info_btn.addEventListener('click', save);

  $('#btns_screen2').toggle(false);
  resizeCanvas();

  $('#toast').toast({delay: 3000})
  $('#toast-success').toast({delay: 3000})
  $('#spinner').toggle(false);
}

function parse_points(input){
  var arr = [];
  for (var i = 0; i < input.length; i+=2){
    arr.push({x: input[i], y: input[i+1], time: 1, color: 'black'})
  }
  return arr;
}

function indicate(i, points){
  redraw(10, points);
  let ctx = screen2.getContext('2d');
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(points[i-1]['x'], points[i-1]['y'], 10, 10)
  ctx.fillStyle = "#000000";
}

function update_view(db_dat){
  fetched_x = db_dat[0];
  fetched_y = db_dat[1];
  data = parse_points(db_dat.slice(2));
  redraw(10, data);
}

export {update_view};

function resizeCanvas() {
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);
  screen2.width = screen2.offsetWidth * ratio;
  screen2.height = screen2.offsetHeight * ratio;
  screen2.getContext("2d").scale(ratio, ratio);
}

window.addEventListener("resize", resizeCanvas);

function save(){
  if (isNaN(march_num_in.value) || march_num_in.value == '' ||
      march_num_in.value < 1 || march_num_in.value > data.length){
    $('.toast-body').html("Please enter a valid position number!");
    $('#toast').toast('show');
    march_num_in.focus();
  }
  else {
    btns1.style.display = "none";
    btns2.style.display = "block";
    indicate(march_num_in.value, data);
    $('#x_label').html(Math.floor(data[march_num_in.value]['x'] / fetched_x * 100))
    $('#y_label').html(Math.floor(data[march_num_in.value]['y'] / fetched_y * 53))
  }
}