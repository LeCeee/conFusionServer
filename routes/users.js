var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../model/users');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user != null) {
      var err = new Error('User ' + req.body.username + ' already exists!');
      err.status = 403;
      next(err);
    }
    else {
      return User.create({
        username: req.body.username,
        password: req.body.password});
    }
  })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'Registration Successful!', user: user});
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/login',(req,res,next) => {
  if (!req.session.user) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      var err = new Error('you are not authorised');
      res.setHeader('WWW-Authenticate','Basic');
      err.status = 401;
      return next(err);
      
    }
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username= auth[0];
    var password= auth [1];
    //console.log(user);
    User.findOne({username:username})
    .then( (user) => {
      if(user === null) {
        var err = new Error('user'+ username+ 'does nnot exist');
        err.status = 403;
        return next(err);
      }
      else if (user.password !== password) {
          var err = new Error('your password is incorrect');
          err.status = 403;
          return next(err);
      }
      else if (user.username === username && user.password === password) {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.end('you are authenticated');
      }
      
    })
    .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('you are authenticated');
  }
});
router.get('/logout',(req,res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session_id');
    res.redirect('/');
  } 
  else {
    var err = new Error('you are not logged in');
    err.status = 403;
    next(err);
  }
});


module.exports = router;
