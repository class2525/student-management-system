const { body } = require("express-validator");

exports.studentValidation = [
  body("first_name").notEmpty().withMessage("First name required"),
  body("last_name").notEmpty().withMessage("Last name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("date_of_birth").isDate().withMessage("Valid date required"),
];
