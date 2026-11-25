const joi = require('joi');

const updateDescriptionSchema = joi.object({
    description: joi.string().trim().allow('').max(500).required()
});

exports.validateUpdateDescription = (req, res, next) => {
    const { error, value } = updateDescriptionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
};

