const accountService = require('../Services/accountService');

exports.handleRegister = async (req, res, next) => {
    try {
        const user = await accountService.register(req.body);
        res.status(201).json({
            message: 'Bruger oprettet',
            user // Returner den oprettede bruger uden password
        });
    } catch (error) {
        next(error);
    }
};

exports.handleLogin = async (req, res, next) => {
    try {
        const user = await accountService.login(req.body);

        // Når vi senere tilføjer express-session eller JWT-cookie,
        // gemmes session/cookie her i controller-laget.
        res.status(200).json({
            message: 'Login gennemført', // Postman response message
            user
        });
    } catch (error) {
        next(error);
    }
};