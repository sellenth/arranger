var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST */
router.post('/', function (req, res) {
  console.log('waddup thugg');
  var img = req.body.value;
  var img = img.split(',')[1];
  let buff = new Buffer(img, 'base64');
  console.log(img);
  fs.writeFile('pac.png', buff, (err) => {});
})

module.exports = router;
