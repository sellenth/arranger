var canvas;
var signaturePad;
import {emission, socket} from './sock-share.js'

window.addEventListener('DOMContentLoaded', init, false);

var drawer = document.getElementById('drawer');
var plotter = document.getElementById('plotter');
var save_btn = document.getElementById('save_btn');
var back_btn = document.getElementById('back_btn');
save_btn.addEventListener('click', save);
back_btn.addEventListener('click', show);
var clear_btn = document.getElementById('clear_btn')

function init() {
  plotter.style.display = "none";
  canvas = document.getElementById('signature-pad');
  signaturePad = new SignaturePad(canvas, {
    minWidth: 5,
    maxWidth: 10,
  });
  clear_btn.addEventListener('click', function() {
    signaturePad.clear();
  });
}

function show(){
    drawer.style.display = "block";
    save_btn.style.display = "inline-block";
    clear_btn.style.display = "inline-block";
    plotter.style.display = "none";
}

function save(){
  drawer.style.display = "none";
  save_btn.style.display = "none";
  clear_btn.style.display = "none";
  plotter.style.display = "block";

  const data = signaturePad.toData();
  emission(data);
}