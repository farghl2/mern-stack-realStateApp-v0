import  express  from "express";
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';

import connectDB from "./data/db.js";

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.router.js'
import listingRouter from './routes/listing.route.js'




const app = express();


dotenv.config();
app.use(express.json());
app.use(cookieParser());

connectDB()

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/list',listingRouter)


app.use((error, req, res,next)=>{

    return res.status(error.statusCode || 500).json({status:error.status,message:error.message})
})

// app.all('*',(req,res)=>{
//     return res.status(401).json({status:ERROR,data:{message:'this resourse not found'}});
// })

app.listen(3000, ()=>{
    console.log('the server is running at port 3000')
})