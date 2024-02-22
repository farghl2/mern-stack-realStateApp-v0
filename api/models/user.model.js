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
    },
    photoURL:{
        type:String,
        default:'https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png'
    }
},{timestamps:true})


const userModel = mongoose.model('User',userSchema);

export default userModel;