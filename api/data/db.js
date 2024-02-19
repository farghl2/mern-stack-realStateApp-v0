import mongoose from "mongoose"

const connectDB = ()=>{
    mongoose.connect(process.env.DB_LINK).then(()=>{
        console.log('db is running!')
    })
}

export default connectDB;