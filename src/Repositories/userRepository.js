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
    return await User.findByIdAndUpdate(id, {$set: userData, returnDocument: 'after', runValidators: true})
}

exports.deleteUser = async (id) => {
    await User.findByIdAndDelete(id)
}

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email.toLowerCase()}); 
}

exports.getUserByEmailWithPassword = async (email) => {
    return await User.findOne({ email: email.toLowerCase()}).select('+password') // This will include the password field in the result
}


