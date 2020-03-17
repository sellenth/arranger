import {emission} from './sock-share.js'
import {set_coords} from './point-plot.js'

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
var data;
var signaturePad;

function init() {
  signaturePad = new SignaturePad(screen1, {
    minWidth: 5,
    maxWidth: 10,
  });

  save_btn.addEventListener('click', save);
  back_btn.addEventListener('click', show);
  clear_btn.addEventListener('click', function() {
    signaturePad.clear();
  });

  screen2.style.display = "none";
  btns2.style.display = "none";
  resizeCanvas();

  $('#toast').toast({delay: 2000})
}

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
    //emission(data);
  }
}