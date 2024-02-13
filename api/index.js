import  express  from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";

const app = express();

dotenv.config()
app.use(express.json())
mongoose.connect(process.env.DB_LINK).then(()=>{
    console.log('db is running!')
})

app.listen(3000, ()=>{
    console.log('the server is running at port 3000')
})