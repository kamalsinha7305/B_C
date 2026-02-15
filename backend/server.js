import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDB.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import userRouter from './route/user.route.js';
const app=express();
dotenv.config();

app.use(cors({
    credentials:true ,
    orgin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"]
    }
))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy:false
}));

const port =process.env.PORT || 8000;
app.get('/',(req,res)=>{

    res.json({
        message:"Server is running on " + port 
    })
})

app.use('/api/user',userRouter)
await connectDb();
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})