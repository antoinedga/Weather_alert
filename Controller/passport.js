const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const opts = {};

opts.jwtFromRequest = req => {return req.cookies.access_token},
opts.secretOrKey = process.env.MONGO_SECRET;

module.exports = passport => {

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id, '_id')
        .then(user => {
          if (user) {

            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
