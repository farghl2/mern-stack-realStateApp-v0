
import userModel from '../models/user.model.js'

export const signUp = async(req, res, next)=>{
    const {username, email, password} = req.body;
 try{
    const currentUser = userModel.findOne({email:email})
    if(currentUser.email === email){
        return res.status(401).json({message:'this email exist'});
    }else if(currentUser.username === username){
        return res.status(401).json({message:'this username is exist'});
    }
    const newUser = new userModel({
        username,
        email,
        password
    });
    const user = await newUser.save()
    return res.status(201).json(user);
}catch(erorr){
    // next(erorr)
    res.status(500).json({message:erorr.message})
}
   
}