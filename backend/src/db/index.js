import mongoose from "mongoose";

const connectDB = async () => {
    try {
<<<<<<< HEAD
        // const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/databaseOne`);
=======
        // const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/studentTest`);
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/databaseOne`);
        console.log(`MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;