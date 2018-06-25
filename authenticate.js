var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/users');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');


exports.local= passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn:3600});
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload,done) => {
        console.log("JWT payload ",jwt_payload);
        User.findOne({_id: jwt_payload._id},(err,user) => {
            if (err) {
                return done(err,false);
            }
            if (user) {
                return done(null,user);
            }
            else {
                return done(null,false);
            }
        })
    }));
// exports.jwtPassport = passport.use(new JwtStrategy(opts,
//     (jwt_payload, done) => {
//       User.findOne({ _id: jwt_payload._id }, (err, user) => {
//         if (err) {
//           return done(err, false);
//         }
//         if (user) {
//           return done(null, user);
//         } else {
//           return done(null, false);
//         }
//       })
//     })
//   );
    exports.verifyUser = passport.authenticate('jwt',{session: false});
    exports.verifyAdmin = (req,res,next) => {
        if(req.user.admin)
            next();

        else {
            var err = new Error('you are not an admin');
            err.status = 403;
            return next(err);
        }
    }
    // exports.verifyCreater = (req,res,next) => {
    //     if((req.coomments.author).equals(req.user._id))
    //         next();
    //     else {
    //         var err = new Errro('only creator can perform this');
    //         err.status = 403;
    //         return next(err);
    //     }
    // }