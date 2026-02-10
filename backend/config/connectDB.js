import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


if(!process.env.MONGODB_URL){
   throw new Error("mongo url is not aded  in the .env file check again ");
}

const connectDb= async()=>{
    try{
         await mongoose.connect(process.env.MONGODB_URL);
         console.log("mongodb connected")
    }
    catch(err){
        console.error("Mongo db not connected ", err.message);
        process.exit(1);
     
    }

}

export default connectDb;