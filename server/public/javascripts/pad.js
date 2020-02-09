import {emission} from './sock-share.js'

window.addEventListener('DOMContentLoaded', init, false);

let tophalf    = document.getElementById('top-half');
let bothalf   = document.getElementById('bottom-half');
let save_btn  = document.getElementById('save_btn');
let back_btn  = document.getElementById('back_btn');
let clear_btn = document.getElementById('clear_btn')
let canvas    = document.getElementById('signature-pad');

var signaturePad;


function init() {
  signaturePad = new SignaturePad(canvas, {
    minWidth: 5,
    maxWidth: 10,
  });

  save_btn.addEventListener('click', save);
  back_btn.addEventListener('click', show);

  clear_btn.addEventListener('click', function() {
    signaturePad.clear();
  });

  bothalf.style.display = "none";
}

function show(){
    tophalf.style.display = "block";
    bothalf.style.display = "none";
}

function save(){
  tophalf.style.display = "none";
  bothalf.style.display = "block";
  const data = signaturePad.toData();
  emission(data);
}