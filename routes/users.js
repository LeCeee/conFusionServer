var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../model/users');
var passport = require('passport');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User ({username: req.body.username}),
    req.body.password,(err,user) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type','application/json');
        res.json({err:err});
      }
      else {
        passport.authenticate('local')(req,res,() => {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json({success:true,status:'registration successful!'});
        });
      }
   });
});

router.post('/login',passport.authenticate('local'),(req,res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success: true,status:'you are succesfully logged in!'});
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
