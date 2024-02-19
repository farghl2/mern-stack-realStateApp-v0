import bcrybt from 'bcryptjs'
import userModel from '../models/user.model.js'
import asyncWraber from '../middlewares/asyncWraber.js';
import appError from '../utils/appError.js';
import { SUCCESS, FAIL, ERROR } from '../utils/httpResStatusText.js';
import generateToken from '../utils/generateJWT.js';

export const signUp = asyncWraber(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        const error = appError.create(500, FAIL, 'enter all required data');
        return next(error);
    }

    const existUser = await userModel.findOne({ email })
    if (existUser) {
        const error = appError.create(400, FAIL, 'this username or email existing');
        return next(error);
       
    }

    const crybtedPassword = bcrybt.hashSync(password, 10);
    const newUser = new userModel({
        username,
        email,
        password: crybtedPassword
    });

    const user = await newUser.save()
    const token =await generateToken({email:user.email,id:user._id});
    return res.cookie('token',token,{httpOnly:true}).status(201).json({
        status: SUCCESS,
        data: {
            message: 'user created successfuly'
        }
    });


})


export const signIn =asyncWraber(async (req, res, next) => {
    const { email, password } = req.body;


    const validUser = await userModel.findOne({ email: email });
    if (!validUser) {
        const error = appError.create(500, FAIL, 'user not found')
        return next(error)
    }
    const validPassword = bcrybt.compareSync(password, validUser.password);
    if (!validPassword) {
        const error = appError.create(500, ERROR, 'wrong password')
    }
    const token = await generateToken({ email: validUser.email, id: validUser._id });
    res.cookie('token', token, { httpOnly: true }).status(200).json({ status: SUCCESS, data: { message: 'user login successfuly' } });
})