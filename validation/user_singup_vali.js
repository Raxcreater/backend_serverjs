
const Joi = require('joi');
const valid_schema = Joi.object({

    Name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    Email: Joi.string().email().required(),
    mobileNumber: Joi.number().required(),
    City: Joi.string().min(3).max(22).required(),
    Country: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()

})

module.exports = {
    valid_schema
}


// username: Joi.string()
//     .alphanum()
//     .min(3)
//     .max(30)
//     .required()