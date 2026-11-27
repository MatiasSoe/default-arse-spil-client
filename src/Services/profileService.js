const userRepository = require("../Repositories/userRepository");
const AppError = require("../utils/AppError");

const toProfile = (user) => ({
    id: user._id,
    username: user.username,
    imageUrl: user.imageUrl,
    description: user.description ?? ''
});

exports.getProfile = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new AppError('Profilen blev ikke fundet', 404);
    }

    return toProfile(user);
};

exports.UpdateProfile = async (profileData, userId) => {
    const updatedUser = await userRepository.updateUser(profileData, userId);
    if (!updatedUser) {
        throw new AppError('Profilen blev ikke opdateret', 400);
    }
    return toProfile(updatedUser);
}





