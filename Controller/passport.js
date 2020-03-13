
var model = require('../Model/database');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require('dotenv').config();

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.KEY;

var cookieExtractor = function(req) {

  var token = null;
  if (req && req.cookies)
    token = req.cookies['jwt'];

  return token;
}

module.exports = passport => {

  passport.use('jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {

      model.userByID(jwt_payload._id)
        .then(
            user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};