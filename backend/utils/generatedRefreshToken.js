import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
dotenv.config();

const generatedRefreshToken = async (userId)=>{
   const token =await jwt.sign({id:userId}, 
    process.env.SECRET_KEY_ACCESS_TOKEN,
    {expiresIn: '7d'})

   const updateRefereshToken = await userModel.updateOne(
      {_id:userId},
   {refresh_token: token})


}

export default generatedRefreshToken