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


module.exports =mongoose.model('User',userSchema);