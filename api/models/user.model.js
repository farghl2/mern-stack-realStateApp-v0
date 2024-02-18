import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        uniqe:true
    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})


const userModel = mongoose.model('User',userSchema);

export default userModel;