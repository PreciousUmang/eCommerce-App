import mongoose from 'mongoose';

async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected:', connect.connection.host);
    } catch (err) {
        console.log('Connection Failed:', err.message);
        process.exit(1);
    }
}

export default connectDB;