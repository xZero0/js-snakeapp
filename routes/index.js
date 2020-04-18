var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Snake' });
});

router.get('/snake', function(req, res, next) {
  res.render('snake', { title: 'The Snake Game' });
});

router.post('/snake-info', function(req, res, next) {
  res.send({ name: 'Snake1' });
});


module.exports = router;
