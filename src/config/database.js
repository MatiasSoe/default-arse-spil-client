//Her er Database forbindelsen

const mongoose = require('mongoose');

const connectDB = async () => {
    const connectionString =
        process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/damp';

    await mongoose.connect(connectionString);
    console.log('MongoDB tilsluttet');
};

module.exports = connectDB; 






