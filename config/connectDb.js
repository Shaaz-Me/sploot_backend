import mongoose from "mongoose";



const connectDb = async (DATABASE_URL,DATABASE_NAME) => {

    try {
        const DB_OPTIONS = {
            dbName : DATABASE_NAME
        }

        mongoose.set('strictQuery',true);

        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
    } catch (err) {
        console.log(err);
    }
}

export default connectDb;