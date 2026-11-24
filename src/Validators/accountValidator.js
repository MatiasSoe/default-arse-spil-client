const joi = require('joi');

const registerSchema = joi.object({
    username: joi.string().trim().min(3).max(30).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().min(8).max(128).required()
});

const loginSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().required()
});

exports.validateRegister = (req, res, next) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
};

exports.validateLogin = (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
};