import express from 'express'
import { signUp } from '../services/auth.service.js';



const router = express.Router();



router.post('/signup', signUp);


export default router;