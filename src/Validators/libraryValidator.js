const joi = require('joi');

const libraryQuerySchema = joi.object({
    search: joi.string().trim().allow('').max(100)
});

exports.validateLibraryQuery = (req, res, next) => {
    const { error, value } = libraryQuerySchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.validatedQuery = value;
    next();
};
