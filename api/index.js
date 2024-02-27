import  express  from "express";
import dotenv from "dotenv"

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { ERROR } from "./utils/httpResStatusText.js";
import connectDB from "./data/db.js";
import cookieParser from 'cookie-parser';
import verifyToken from "./middlewares/verifyToken.js";

const app = express();


dotenv.config();
app.use(express.json());
app.use(cookieParser());

connectDB()

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


app.use((error, req, res,next)=>{

    return res.status(error.statusCode || 500).json({status:error.status,message:error.message})
})

// app.all('*',(req,res)=>{
//     return res.status(401).json({status:ERROR,data:{message:'this resourse not found'}});
// })

app.listen(3000, ()=>{
    console.log('the server is running at port 3000')
})