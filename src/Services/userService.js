const User = require('../models/userModel');

class UserService {
    async createUser(userData) {
        const existingUser = await User.findOne({
            email: userData.email
        });

        if (existingUser) {
            throw new Error('Email er allerede registreret');
        }

        const user = new User(userData);
        return user.save();
    }

    async getAllUsers() {
        return User.find();
    }
}

module.exports = UserService;


