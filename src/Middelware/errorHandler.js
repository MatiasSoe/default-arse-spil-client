const AppError = require("../utils/AppError")

function errorHandler(err, _req, res, _next){
    if (err instanceof AppError){
        return res.status(err.status).json({error: err.message})
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).json({error: 'Ugyldige data'});
    }
    if (err.type === 'entity.parse.failed'){
        return res.status(400).json({error: 'Ugyldigt JSON'});
    }
    console.error('Uventet serverfejl:', err);
    res.status(500).json({error: 'Intern serverfejl'});
}
module.exports = errorHandler