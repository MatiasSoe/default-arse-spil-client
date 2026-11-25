const profileService = require('../Services/profileService');

// min profil
exports.handleGetMyProfile = async (req, res, next) => {
    try {
        const profile = await profileService.getProfile(req.auth.userId);
        res.status(200).json({ profile });
    } catch (error) {
        next(error);
    }
};


exports.handleGetProfileById = async (req, res, next) => {
    try {
        const profile = await profileService.getProfile(req.params.id);
        res.status(200).json({ profile });
    } catch (error) {
        next(error);
    }
};


exports.handleUpdateDescription = async (req, res, next) => {
    try {
        const profile = await profileService.UpdateUser(req.body.description, req.auth.userId);
        res.status(200).json({ profile });
    } catch (error) {
        next(error);
    }
};

//ikke nogen generel update metode endnu