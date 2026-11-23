//Her er Database forbindelsen

const mongoose = require('mongoose');

const connectDB = async () => {
    const connectionString =
        process.env.MONGO_URI;

    await mongoose.connect(connectionString);
    console.log('MongoDB tilsluttet');
};

module.exports = connectDB;




