import express from 'express'
import { test, updateUser } from '../services/user.service.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router()


router.get('/test',test)
router.put('/updateUser/:id',verifyToken,updateUser);


export default router;