//Her er Database forbindelsen

const mongoose = require('mongoose');

const connectDB = async () => {
    const connectionString =
        process.env.MONGO_URI;
    if (!connectionString) throw new Error('MONGO_URI mangler i .env');
    await mongoose.connect(connectionString);
    console.log('MongoDB tilsluttet');
};

module.exports = connectDB;




