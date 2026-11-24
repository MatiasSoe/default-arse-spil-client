const userRepository = require('../Repositories/userRepository');
const AppError = require('../utils/AppError');

exports.CreateUser = async (newUserData) => {
    const newUser = await userRepository.createUser(newUserData);
    if (!newUser) {
        throw new AppError('Karakteren blev ikke oprettet');
    }
    return newUser;
}

exports.UpdateUser = async (newUserData, id) => {
    const updatedUser = await userRepository.updateUser(newUserData, id);
    if (!updatedUser) {
        throw new AppError('Karakteren blev ikke opdateret');
    }
    return updatedUser;
}

exports.DeleteUser = async (userId) => {
    const user = await userRepository.deleteUser(userId);
    
    if (!user) {
        throw new AppError('Karakteren blev ikke fundet');
    }

    return null;
}

exports.GetUserById = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new AppError('Karakteren blev ikke fundet');
    }
    return user;
}

exports.GetAllUsers = async () => {
    return await userRepository.getAllUsers();
}



