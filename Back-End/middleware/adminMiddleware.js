const Joi = require('joi');

const createAdminSchema = Joi.object({
    u_name: Joi.string().required(),
    u_email: Joi.string().required(),
    u_password: Joi.string().required(),
});

const loginAdminSchema = Joi.object({
    u_email: Joi.string().required(),
    u_password: Joi.string().required()
});


const createEventSchema = Joi.object({
    e_name: Joi.string().required(),
    e_venue: Joi.string().required(),
    e_startdate: Joi.date().iso().required(),
    e_enddate: Joi.date().iso().required(),
    e_capacity: Joi.number().required()

});


module.exports = {
    createAdminSchema,
    loginAdminSchema,
    createEventSchema
};