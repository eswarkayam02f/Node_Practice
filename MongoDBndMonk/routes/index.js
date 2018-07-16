var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: true, anyArray: [1,2,3] });
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  userData.find({}).then((docs) => {
    res.render('index', {items: docs});
  });
  //data.then('success', function(docs) {
  //  res.render('index', {items: docs});
  //});  
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  userData.insert(item);

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  userData.update({"_id": db.id(id)}, item);
  //userData.updateById(id, item);
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  userData.remove({"_id": db.id(id)});
  //userData.removeById(id, item);
  
});



module.exports = router;
