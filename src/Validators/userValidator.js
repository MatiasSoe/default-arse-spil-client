const joi = require('joi');


const userValidationSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
})

exports.validateUser = (req, res, next) => {
    const {error} = userValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    next();
}
