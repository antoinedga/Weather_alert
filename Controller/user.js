const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require("./validation/login");
const database = require('../Model/database');
const passport = require('passport');
require('./passport')(passport);


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

  database.userFindOne(req.body.email).then(user => {
      if (user != null) {
        return res.status(400).json({ email: "Email already exists" });
      } 
      
      else {
        const newUser ={
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          zipcode: req.body.zipcode
        };
  // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {

      bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            database.createNewUser(newUser).then(() => {
            return res.status(200).send('Account created')
            }
            )
            .catch((error) => {
              res.status(400).send(error);
            });
          });
        });

      }
    });
    
  });

  router.get('/test',passport.authenticate('jwt',{session: false}),
  function(req, res) {
    // console.log(req);
    return res.status(200).send();
  });



  router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    else {
      // if NUll no account, resolves to null if empty
      database.userFindOne(req.body.email)
      .then((user) => {
        if(user == null)
          return res.status(400)
          .send({
            success: false,
            error: `NO ACCOUNT UNDER ${req.body}`
          });

        else {
          // compares input value to the hash password
          bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
              // User matched
              // Create JWT Payload
              const payload = {
                id: user._id,
                name: user.username
              };
              console.log(process.env.KEY);
              // Sign token
              const token = jwt.sign(
                payload,
                process.env.KEY,
                {
                  expiresIn: 60 * 60 // 1 hour in seconds
                }
              );
                res.cookie('jwt', token, {expires: new Date(Date.now() + 5 * 3600000)});
                res.json({ success: true, token: 'JWT ' + token });
            } 
            else {
              return res
                .status(400)
                .json({ error: "Password incorrect", success: false});
            }

          });
        }

      })
    }



  })


module.exports = router;