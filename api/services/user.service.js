
import asyncWraber from "../middlewares/asyncWraber.js"
import appError from "../utils/appError.js";
import { FAIL, SUCCESS } from "../utils/httpResStatusText.js";
import userModel from "../models/user.model.js";
import bcrybt from 'bcryptjs'

export const test = (req, res) => {
    res.json({ message: 'test' })
}


export const updateUser =asyncWraber(async (req, res, next) => {
    const id = req.user.id;
    if (id != req.params.id) {
        const error = appError.create(401, FAIL, 'you can change your account only');
        return next(error);
    }
    if(req.body.password){
        const crybtedPassword = bcrybt.hashSync(req.body.password, 10);
        req.body.password = crybtedPassword
    }
    const reqData = req.body
    const updatedData =await userModel.findByIdAndUpdate({_id:id},{$set:reqData},{new:true});
    const {password:pass, ...data} = updatedData._doc;
    return res.status(200).json({status:SUCCESS, data });
});


export const deleteUser = asyncWraber(async (req, res, next)=>{
    const id = req.user.id;
    if (id != req.params.id) {
        const error = appError.create(401, FAIL, 'you can change your account only');
        return next(error);
    }

    const deleteAccount = await userModel.findByIdAndDelete({_id:id});
    return res.clearCookie('token').status(200).json({status:SUCCESS,message:'user deleted successFuly'});

})

export const signOut = (req, res, next)=>{
    return res.clearCookie('token').status(200).json({status:SUCCESS, message:'user sign out successfuly'});
}