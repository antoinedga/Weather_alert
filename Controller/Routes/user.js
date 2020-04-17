const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const location = require("../getGeoCode");
const hour_db = require('../../Model/Hours');
var passport = require('passport');

// Load input validation
const validateRegisterInput = require("./../validation/register");
const validatePassword = require("./../validation/password");
const validateLoginInput = require("./../validation/login");
// Load User model
const User = require("../../Model/User");


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ errorEmail: "Email not found" });
      }
    
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {

        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user._id,
            name: user.name
          };
  // Sign token
  // two expirations just in case. 
          jwt.sign(
            payload,
            process.env.MONGO_SECRET,
            {
              expiresIn: '4h' 
            },
            (err, token) => {
                res
                .status(200)
                .cookie('access_token', token, {
                  expires: new Date(Date.now() + 4 * 3600 * 1000) // cookie will be removed after 4 hours
                }).send();
            }
          );
        } else {
          return res
            .status(401)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });


  // @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
console.log(req.body)
const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {

      var geo_location = location.getGeoCoordination(req.body.zipCode);
      console.log(geo_location);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        latitude: geo_location.lat,
        longitude: geo_location.long,
        city: geo_location.city
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(201))
            .catch(err => {
                res.status(400).json(err);
                console.log(err)
            });
        });
      });
    }
  });
});

router.post("/updatePassword", passport.authenticate('jwt', { session: false }),(req, res) => {
    console.log(req.body);
    console.log(req.user._id);
    const { errors, isValid } = validatePassword(req.body);
    // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      User.findById(req.user._id).then(user => {
          if (user) {
           console.log(user);
             bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user
                  .save()
                  .then(user => res.json(201))
                  .catch(err => {
                      res.status(400).json({password: "couldnt add to database"});
                      console.log(err);
                  });
              });
            });
          }
          else
            return res.status(400).json({ 
                password: "Couldnt change at this time"}  
            );
  
      }).catch(error => console.log(error));
    });
  
    router.delete("/deleteAccount", passport.authenticate('jwt', { session: false }),(req, res) => {
     
        hour_db.findOneAndDelete({user_id: req.user._id}).then((result) => {
            
          User.findByIdAndDelete(req.user._id).then(result => {
            
            return res.status(200).json({success: true});

          }).catch((error) => {
            return res.status(400).json({error: error,
              success: false});
          });
            
        }).catch((error) => {
           return res.status(400).send({success: false, error: error}); 
            });     
    });
         

router.get("/accountInfo", passport.authenticate('jwt', { session: false }),(req, res) => {
        
      User.findById(req.user._id, "email name").then(user => {
          return res.status(200).json(user); 
      }).catch((error) => {
        return res.status(400).json(error);
      });
});
module.exports = router;