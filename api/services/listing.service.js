import asyncWraber from "../middlewares/asyncWraber.js";
import listModel from "../models/list.model.js";
import { SUCCESS } from "../utils/httpResStatusText.js";

export const createListing =asyncWraber(async (req, res, next)=>{
    const listData  = req.body;
   const data = await listModel.create(listData);
   return res.status(201).json({status:SUCCESS,data})
});
