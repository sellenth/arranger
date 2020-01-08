var express = require('express');
var transform  = require('./transform');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST */
router.post('/', function (req, res) {
  var img = req.body.value;
  var img = img.split(',')[1];
  let buff = new Buffer(img, 'base64');
  fs.writeFile('pac.png', buff, (err) => transform.doWork());//{});
})

module.exports = router;
