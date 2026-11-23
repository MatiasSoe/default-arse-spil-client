function validateCreateUser(req, res, next) {
    const name = req.body?.name?.trim();
    const email = req.body?.email?.trim();

    if (typeof name !== 'string') { // sikrer at name er en string - ingen numbers
        return res.status(400).json({
            error: 'Brugernavn skal være en string'
        });
    }

    if (!name) {
        return res.status(400).json({
            error: 'Brugernavn er påkrævet'
        });
    }

    if (name.length < 3) {
        return res.status(400).json({
            error: 'Brugernavn skal være mindst 3 tegn'
        });
    }

    if (typeof email !== 'string') { // sikrer at email er en string - ingen numbers
        return res.status(400).json({
            error: 'Email skal være en string'
        });
    }

    if (!email) {
        return res.status(400).json({
            error: 'Email er påkrævet'
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            error: 'Email har ugyldigt format'
        });
    }

    req.body.name = name;
    req.body.email = email;
    next(); // fortsæt til næste middleware eller controller
}

module.exports = validateCreateUser;