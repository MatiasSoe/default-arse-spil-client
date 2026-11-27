const profileService = require('../Services/profileService');
const libraryService = require('../Services/libraryService');
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

exports.handleUpdateProfile = async (req, res, next) => {
    try {
        const profile = await profileService.UpdateProfile(req.body, req.auth.userId);
        res.status(200).json({ profile });
    } catch (error) {
        next(error);
    }
};

exports.handleGetMyGames = async (req, res, next) => {
    try {
        const search = req.validatedQuery ? req.validatedQuery.search : req.query.search;
        const games = await libraryService.getOwnedGames(req.auth.userId, search);
        res.status(200).json({ games });
    } catch (error) {
        next(error);
    }
};
