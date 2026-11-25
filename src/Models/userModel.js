const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false // This will prevent the password from being returned in queries by default
    },
    description: {
        type: String,
        default: '',
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    imageUrl: {
        type: String,
        default: ''
    }
});


module.exports = mongoose.model('User', userSchema);

