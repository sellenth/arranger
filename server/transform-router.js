var fs = require('fs');
var transform  = require('./transform');

function process_input(img){
  var field_dat = [];
  /*
  let buff = new Buffer((img.split(','))[1], 'base64');
  fs.writeFile('pac.png', buff, (err) => transform.doWork());
  //var text = fs.readFileSync("./out.txt", "utf-8");
  var text = fs.readFileSync("./pure_coords.txt", "utf-8");
  var field_dat = text.split('\n');
  */
  for (var i = 0; i < img.length; i++){
    for (var j = 0; j < img[i].length; j++){
     field_dat.push([img[i][j]['x'], img[i][j]['y']]);
    }
  }
  return field_dat
}

module.exports = process_input;
