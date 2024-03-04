import express from 'express'
import { googleAuth, signIn, signUp } from '../services/auth.service.js';



const router = express.Router();



router.post('/signup', signUp);
router.post('/signin',signIn)
router.post('/google',googleAuth)


export default router;