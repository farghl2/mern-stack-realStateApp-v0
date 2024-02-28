import express from 'express'
import { deleteUser, test, updateUser } from '../services/user.service.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router()


router.get('/test',test)
router.post('/updateUser/:id',verifyToken,updateUser);
router.delete('/deleteUser/:id',verifyToken,deleteUser)


export default router;