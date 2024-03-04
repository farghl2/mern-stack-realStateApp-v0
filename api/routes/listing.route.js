import express from "express";


import verifyToken from "../middlewares/verifyToken.js";
import { createListing } from "../services/listing.service.js";

const router = express.Router();


export default router.post('/createListing', verifyToken, createListing)