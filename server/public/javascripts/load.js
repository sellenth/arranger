import {emission, get_from_db} from './sock-share.js'
import {set_coords, getFilteredCoords} from './point-plot.js'

window.addEventListener('DOMContentLoaded', init, false);

let screen1   = document.getElementById('signature');
let screen2   = document.getElementById('point');
let btns1     = document.getElementById('btns_screen1')
let btns2     = document.getElementById('btns_screen2')
let save_btn  = document.getElementById('save_btn');
let back_btn  = document.getElementById('back_btn');
let toast     = document.getElementById('toast');
let clear_btn = document.getElementById('clear_btn')
let march_num_in = document.getElementById("m_num_in");
var data = [];
var signaturePad;

function init() {
  get_from_db();

  /*
  signaturePad = new SignaturePad(screen1, {
    minWidth: 5,
    maxWidth: 10,
  });

  save_btn.addEventListener('click', save);
  back_btn.addEventListener('click', show);
  $('#send_btn').on('click', send);
  clear_btn.addEventListener('click', function() {
    signaturePad.clear();
  });

  resizeCanvas();
  */

  $('#toast').toast({delay: 3000})
  $('#toast-success').toast({delay: 3000})
  $('#spinner').toggle(false);
}

function update_view(db_dat){
  // db_dat[0] is width of record
  // db_dat[1] is height of record
  // db_dat[the rest] is x then y coordinates of points
  // just need to draw these points onto the pad
  // then link the text box to tell field location of particular point
  // then done ;)
}

export {update_view};

function resizeCanvas() {
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);
  screen1.width = screen1.offsetWidth * ratio;
  screen1.height = screen1.offsetHeight * ratio;
  screen1.getContext("2d").scale(ratio, ratio);
  signaturePad.clear(); // otherwise isEmpty() might return incorrect value
  screen2.width = screen1.width;
  screen2.height = screen1.height;
  signaturePad.fromData(data);
}

window.addEventListener("resize", resizeCanvas);

function show(){
    screen1.style.display = "block";
    btns1.style.display = "block";
    screen2.style.display = "none";
    btns2.style.display = "none";
    resizeCanvas();
    signaturePad.fromData(data);
}

function save(){
  if (isNaN(march_num_in.value) || march_num_in.value == ''){
    $('.toast-body').html("Please enter the number of marchers!");
    $('#toast').toast('show');
    march_num_in.focus();
  }
  else {
    screen1.style.display = "none";
    btns1.style.display = "none";
    btns2.style.display = "block";
    screen2.style.display = "block";
    data = signaturePad.toData();
    set_coords(data);
  }
}

function minify_dat(d, arr){
  for (var i = 0; i < d.length; i++){
    let x = Math.floor(d[i].x)
    let y = Math.floor(d[i].y)
    arr.push(x);
    arr.push(y);
    //d[i] = {x: x, y: y}
  }
  //return d
  return arr
}

function send(){
  let dat = getFilteredCoords();
  if( dat.length == 0) {
    $('.toast-body').html("Try again, can't send an empty formation!");
    $('#toast').toast('show');
  }
  else {
    $('#spinner').toggle();
    /*
    let disp_size = {
      width: screen2.clientWidth,
      height: screen2.clientHeight
    }
    dat = minify_dat(dat);
    dat.push(disp_size);
    */

    var arr = [screen2.clientWidth, screen2.clientHeight];
    arr = minify_dat(dat, arr);
    emission(arr);
  }
}