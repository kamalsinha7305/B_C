import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import verifyEmailTempplate from "../utils/verifyEmailTemplate.js";
import crypto from "crypto";
import sendEmail from "../config/sendEmail.js";
import jwt from "jsonwebtoken";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import cookie from "cookie-parser";
import auth from "../middleware/auth.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import {generateOtp} from "../utils/generateOtp.js";
import forgotPaswordTemplate from "../utils/forgotPasswordTemplate.js";
import dotenv from "dotenv";
dotenv.config();

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
    user.verfiyEmailToken = "";
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
     
        const checkpassword= await bcrypt.compare(password ,user.password);

        if(!checkpassword){
            return res.status(400).json({
                message : "Check your password",
                success:false ,
                error : true
            })
        }
        const accesstoken = await generatedAccessToken(user._id);
        const refreshtoken =await generatedRefreshToken(user._id);
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
        const userid =  req.usedId // middleware from 
        const cookieoption={
            httpOnly :true,
            secure : true ,
            sameSite :"None"
         }
       res.clearCookie("accessToken",cookieoption);
       res.clearCookie("refreshToken",cookieoption);
       const removeRefreshToken = await userModel.findByIdAndUpdate(userid,{
        refresh_token :""
       })
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

export const uploadAvatar =async (req,res) =>{
    try {
        const userId =req.userId; // coming from auth middleware
        const image =req.file;   // comming form mullter middleware
        const upload =await uploadImageCloudinary(image);
        const updateuser = await userModel.findOneAndUpdate(userId,{
            avatar : upload.url
        })
        return res.status(200).json({
            message:"upload profile ",
            error :false,
            success :true, 
            data : updateuser

        })
        console.log("image", image);

    } catch (error) {
        return res.status(500).json({
            message: error.message || error ,
            success: false,
            error : true 
        })
    }
}

export const updateUserDetail =async(req,res)=>{
    try {
        const userId = req.userId // auth middleware 
        const {name , email , mobile , password} =req.body ;
        let hashpassword = ""
        if(password){
            
        const hashpassword = await bcrypt.hash(password, 10);
               
        }

        const updateUser = await userModel.updateOne(userId,{
            ...(name && {name :name }),
            ...(email && {email :email }),
            ...(mobile && {mobile :mobile }),
            ...(password && {password :hashpassword})
            
            
        })
        return res.status(200).json({
            message : "update user",
            success : true,
            error :false
        }

        )
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success :false,
            error : true 
        })
    }
}

export const forgotPaswordController =async(req,res) =>{
    try{

        const {email} =req.body;
        const user =await userModel.findOne({email});
        
        if(!user) {
            return res.status(500).json({
                message :"Email not available",
                success:false,
                error :true 
            }) 
        }

        const otp = await generateOtp() 
        const expirestime = new Date(Date.now() + 60 * 60 * 1000);
        const update =await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp: otp,
            forgot_password_expiry : expirestime

        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password from Binkeyit",
            html : forgotPaswordTemplate({
                user : user.name ,
                otp : otp
            }) 
        })

        return res.status(200).json({
            message : "Otp send ",
            success : true , 
            error : false
        })
    }
    catch(error){
        return res.status(500).json({
            message :error.message || err ,
            success :false,
            error : true 
        })

    }
}

export const verifyforgotpasswordotp =async(req, res)=>{
    try {

        const { email, otp } = req.body;

        if(!email || !otp ){
            return res.status(400).json({
                message :"Please provide email and otp",
                success : false,
                error : true 
            })
        }
        const user =await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : " Invalid Email Id",
                success : false ,
                error : true
            })
        }

        const currentTime =new Date();
        if(user.forgot_password_expiry < currentTime){
            return res.status(400).json({
                message : "Otp is expired",
                success : false,
                error : true 
            })
        }
        
        if(otp !== user.forgot_password_otp){
            return res.status(400).json({
                messgae : "Invalid opt",
                success :false,
                error : true
            })
        }

        // if otp is not expired and otp == user.forgot_password_otp 
        
        return res.json({
           message :"Verified otp", 
           error :false,
           success:true 
        })

    } catch (error) {

         return res.status(500).json({
            message :error.message || err ,
            success :false,
            error : true 
        })
        
    }
}           

export const resetpassword = async(req,res) =>{

    try{
        const {email, newPassword,confirmPassword } =req.body
        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message : "Provide Requires field Email, newPassword,ConfirmedField",
                success : false ,
                error :true 
            })
        }

        const user =await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "Invalid user Email not present ",
                error : true,
                success :false 
            })
        }

        if(newPassword !== confirmPassword ){
            return res.status(400).json({
                message :"new Password and confirmPassword not same",
                error : true,
                success :false 

            })
        }
            const hashpassword = await bcrypt.hash(newPassword, 10);
    
            const update  = await userModel.findOneAndUpdate(user._id,{
                password : hashpassword
            })

            return res.status(200).json({

                message : "password updated ",
                error : false,
                success : true 

            })

        
    }
    catch(err){
        return res.status(500).json({
            message : err.message || err,
            success : false,
            error :true 
        })
    }
}

export const refreshToken = async(req,res)=>{
    try{
        const token =req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

        console.log(token);


         if(!token){
            return res.status(401).json({
                message : "unauthorized / invalid token",
                error :true ,
                success :false 

            })
         }
         const verifytoken =await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN);
         
         if(!verifytoken){
            return res.status(401).json({
                message : "token expired",
                error : true,
                success :false  
            })
         }
          const userId = verifytoken?._id;
          const newaccesstoken = await generatedAccessToken(userId);
      
        const cookieoption={
            httpOnly :true,
            secure : true ,
            sameSite :"None"
         }
        res.cookie('accessToken',newaccesstoken,cookieoption);
       
        return res.status(200).json({
            message :"New Access Token Generated",
            success: true ,
            error: false,
            data : {
                newaccesstoken
            }
        })


    } 
    catch(err){
        return res.status(401).json({
            message : err.message || err ,
            succces :false,
            error :true 
        })
    }
}