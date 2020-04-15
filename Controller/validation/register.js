const Validator = require("validator");
const isEmpty = require("is-empty");
const zipCode = require('../getGeoCode');
var sanitize = require('mongo-sanitize');


module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  data.name = sanitize(data.name);
  data.zipCode = sanitize(data.zipCode);
  data.email = sanitize(data.email);
  data.password = sanitize(data.password);
  data.password2 = sanitize(data.password2);


// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = "zipCode field is required";
  }
  else if(zipCode.getGeoCoordination(data.zipCode) == null)
    errors.zipCode = "INVALID zipCode";

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } 
  else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};