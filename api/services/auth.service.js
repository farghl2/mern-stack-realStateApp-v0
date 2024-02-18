import bcrybt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js'

export const signUp = async(req, res, next)=>{
    const {username, email, password} = req.body;
 try{
    const currentUser = await userModel.findOne({username:username})
    if(currentUser){
        return res.status(400).json({
            status:'faild',
            data:{
                title:'this email exist'
            }
            });
    }else if(currentUser){
        return res.status(400).json({message:'this username is exist'});
    }
     const crybtedPassword = bcrybt.hashSync(password,10);
    const newUser = new userModel({
        username,
        email,
        password:crybtedPassword
    });
    const user = await newUser.save()
    return res.status(201).json({
        status:'success',
        data:{
            title:'user created succssfuly'
        }
        });
}catch(erorr){
    // next(erorr)
    res.status(500).json({message:erorr.message})
}
   
}


export const signIn = async (req, res,next)=>{
    const {email, password} = req.body;

    try {
        const validUser =await userModel.findOne({email:email});
        if(!validUser){
            return res.status(401).json({status:'faild',data:{title:'this user not exit'}})
        }
        const validPassword = bcrybt.compareSync(password, validUser.password);
        if(!validPassword){
            return res.status(400).json({status:'falid',data:{title:'this password is wrong'}})
        }
        const token = jwt.sign({userId:validUser._id},process.env.SCT_TOKEN);
        res.cookie('token',token,{httpOnly:true})
        res.status(200).json({status:'success',data:{title:'user enter success!'}})

    }catch(error){
        res.status(500).json({message:erorr.message})
    }
}