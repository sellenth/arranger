var express = require('express');
var router = express.Router();


function populate_field_data(){
  var text = fs.readFileSync("./out.txt", "utf-8");
  field_dat = text.split('\n');
};

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('directions', {data: field_dat[req.params.id]});
});

/* POST 
router.post('/', function (req, res) {
  var img = req.body.value;
  var img = img.split(',')[1];
  let buff = new Buffer(img, 'base64');
  fs.writeFile('pac.png', buff, (err) => transform.doWork());//{});
  populate_field_data();
});
*/

module.exports = router;
