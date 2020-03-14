
var model = require('../Model/database');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require('dotenv').config();

var cookieExtractor = function(req) {

  var token = null;
  if (req && req.cookies)
    token = req.cookies['jwt'];
  console.log('from extract  ' + req.cookies['jwt']);
  return token;
};

module.exports = passport => {

const opts = {};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.KEY;
  passport.use('jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
      
      model.userByID(jwt_payload.id)
        .then(
            user => {
              console.log(user)
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};