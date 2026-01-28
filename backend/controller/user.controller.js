import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import verifyEmailTempplate from "../utils/verifyEmailTemplate.js";
import crypto from "crypto";
import sendEmail from "../config/sendEmail.js";
import jwt from "jsonwebtoken";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import cookie from "cookie-parser";

export const registerUserController = async (req, res) => {

    try {
        const { name, email, password } = req.body;
       console.log(name,email, password);

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Provide name , email and password ",
                error: true,
                success: false
            })
        }
       
        const user = await userModel.findOne({
            email
        })
        if (user) {
            return res.status(400).json({
                message: "user already registered",
                error: true,
                success: false
            })
        }

        const hashpassword = await bcrypt.hash(password, 10);
        
        const verifyToken = crypto.randomBytes(32).toString("hex");

        const newUser = await userModel.create({
            name,
            email,
            password: hashpassword,
            verifyTokenEmail: verifyToken
            
        })
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${verifyToken}`
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "verify email form bilnkit ",
            html: verifyEmailTempplate({ name, url: verifyEmailUrl })

        })

        return res.json({
            message: "user register successfully",
            error: false,
            success: true,
           

        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false

        })
    }

}

export const verifyEmailController =async (req,res) =>{
    try{
     const {code} = req.body;
     if(!code){
        return res.status(400).json({
            message : "verification code required ",
            success :false,
            error:true
        })
     }
    const user  = await userModel.findOne({
        verifyEmailToken :code 
    })
    if(!user){
        return res.status(400).json({
            message : " Invalid or expired verification link",
            success : false,
            error:true 
        })
    }

    user.verfiy_email = true ;
    user.verifyEmailToken = "";
    await user.save();

    return res.status(200).json({
            message : " Verified email",
            success : true ,
            error:false 
        })
    

    }
    catch(err){
         return res.status(500).json({
            message:err.message || err ,
            success:true ,
            error :false
         })
    }
}

export const loginController= async(req, res)=>{
    try{
        const {email , password} = req.body;
        if(!email || !password ){
             return res.status(400).json({
            message : "Please provide email and Password",
            success: false ,
            error: true
        })
        }
        const user = await userModel.findOne({email});
         if(!user){
            return res.status(400).json({
            message : " Inalid User",
            success: false ,
            error: true
        })
        }

        if(user.status!=="Active"){
            return res.status(400).json({
            message : " Contact Admin User Inactive",
            success: false ,
            error: true
        })
        }
     
        const checkpassword= bcrypt.compare(password ,user.password);

        if(!checkpassword){
            return res.status(400).json({
                message : "Check your password",
                success:false ,
                error : true
            })
        }
        const accesstoken = generatedAccessToken(user._id);
        const refreshtoken =generatedRefreshToken(user._id);
        const cookieoption={
            httpOnly :true,
            secure : true ,
            sameSite :"None"
         }
        res.cookie('accessToken',accesstoken,cookieoption);
        res.cookie('refreshToken',refreshtoken,cookieoption);
        return res.status(200).json({
            message :"Login successfully",
            success: true ,
            error: false,
            data : {
                refreshtoken,
                accesstoken
            }
        })
    }
    catch(err){
        return res.status(500).json({
            message : err.message || err,
            success: false ,
            error: true
        })

    }
}

export const logoutController =async(req, res)=>{

    try{
        const cookieoption={
            httpOnly :true,
            secure : true ,
            sameSite :"None"
         }
       req.clearCookie("accessToken",cookieoption);
       req.clearCookie("refreshToken",cookieoption);
       return res.status(200).json({
            message: "Logged Out Successfully ",
            success : true,
            error : false 
        })
    
    }
    catch(err){
        return res.status(500).json({
            message: err.message || err,
            success : false,
            error : true 
        })
    }
}