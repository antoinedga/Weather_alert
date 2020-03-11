const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require('./validation/register')
const database = require('../Model/database');


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
            database.createNewUser(newUser);
          });
        });

      }
    });
    
  });


module.exports = router;