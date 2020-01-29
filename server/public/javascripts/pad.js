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

function init() {
  plotter.style.display = "none";
  canvas = document.querySelector("canvas");
  signaturePad = new SignaturePad(canvas, {
    minWidth: 5,
    maxWidth: 10,
  });
}

function show(){
    drawer.style.display = "block";
    save_btn.style.display = "block";
    plotter.style.display = "none";

}

function save(){
  if (drawer.style.display === "none") {
    drawer.style.display = "block";
    save_btn.style.display = "block";
  } else {
    drawer.style.display = "none";
    save_btn.style.display = "none";
    plotter.style.display = "block";
  }
  //const data = signaturePad.toDataURL();
  const data = signaturePad.toData();
  emission(data);
}