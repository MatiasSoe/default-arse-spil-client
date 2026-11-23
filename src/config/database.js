//Her er Database forbindelsen

const mongoose = require('mongoose');

const connectDB = async () => {
    const connectionString =
        process.env.MONGODB || 'mongodb://127.0.0.1:27017/userdb';

    await mongoose.connect(connectionString);
    console.log('MongoDB tilsluttet');
};

module.exports = connectDB;




