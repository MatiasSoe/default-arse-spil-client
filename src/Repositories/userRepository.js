const User = require('../Models/userModel');

exports.createUser = async (user) => {
    return await User.create(user);
}

exports.getAllUsers = async () => {
    return await User.find()
}

exports.getUserById = async (id) => {
    return await User.findById(id)
}

exports.updateUser = async (userData, id) => {
    return await User.findByIdAndUpdate(id, userData, {returnDocument: 'after'})
}

exports.deleteUser = async (id) => {
    await User.findByIdAndDelete(id)
}



