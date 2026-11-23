const userRepository = require('../Repositories/userRepository');


exports.CreateUser = async (newUserData) => {
    const newUser = await userRepository.createUser(newUserData);
    return newUser;
}

exports.UpdateUser = async (newUserData) => {
    const updatedUser = await userRepository.updateUser(newUserData);
    return updatedUser;
}

exports.DeleteUser = async (userId) => {
    await userRepository.deleteUser(userId);
    return null;
}

exports.GetUserById = async (userId) => {
    const user = await userRepository.getUserById(userId);
    return user;
}

exports.GetAllUsers = async () => {
    return await userRepository.getAllUsers();
}



