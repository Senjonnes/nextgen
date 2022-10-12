const Joi = require("@hapi/joi");

const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const validation  = schema.validate(data)
  return validation;
};

module.exports.signupValidation = signupValidation;
