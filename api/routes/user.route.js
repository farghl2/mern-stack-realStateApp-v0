import express from 'express'
import { test } from '../services/user.service.js';

const router = express.Router()


router.get('/test',test)


export default router;