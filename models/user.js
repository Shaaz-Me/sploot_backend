import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        immutable: true,
        trim: true
    },
    name:{
        type:String,
        required:true,
        trim: true
    },
    age:{
        type:String,
        required: true,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim: true
    }
});

const UserModel = mongoose.model("user",userSchema);

export default UserModel;