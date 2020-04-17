const Validator = require("validator");
const isEmpty = require("is-empty");
var sanitize = require("mongo-sanitize");


module.exports = function validate_email(data) {
    let errors = {};

    data.password = sanitize(data.password);
    data.password2 = sanitize( data.password2);

    if (Validator.isEmpty(data.password)) {
        errors.password += "Password field is required\n";
      }
    if (Validator.isEmpty(data.password2)) {
        errors.password += "Confirm password field is required\n";
      }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password += "Password must be at least 6 characters\n";
      }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password += "Passwords must match\n";
      }
      
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
