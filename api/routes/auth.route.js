import express from 'express'
import { signIn, signUp } from '../services/auth.service.js';



const router = express.Router();



router.post('/signup', signUp);
router.post('/signin',signIn)


export default router;