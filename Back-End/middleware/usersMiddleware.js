const Joi = require('joi');

const createUserSchema = Joi.object({
    u_name: Joi.string().required(),
    u_email: Joi.string().required(),
    u_password: Joi.string().required(),
});

const loginUserSchema = Joi.object({
    u_email: Joi.string().required(),
    u_password: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
    u_email: Joi.string().email().required()
  });

module.exports = {
    createUserSchema,
    loginUserSchema,
    forgotPasswordSchema
};