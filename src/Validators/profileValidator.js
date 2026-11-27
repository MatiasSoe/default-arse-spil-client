const joi = require('joi');

const updateProfileSchema = joi.object({
    description: joi.string().trim().allow('').max(500),
    username: joi.string().trim().min(3).max(30),
    email: joi.string().email(),
    imageUrl: joi.string().allow(''),
    password: joi.string().trim().min(3).max(30),
});

exports.validateUpdateData = (req, res, next) => {
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
};

