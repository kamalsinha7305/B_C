import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import verifyEmailTempplate from "../utils/verifyEmailTemplate.js";
import crypto from "crypto";
import sendEmail from "../config/sendEmail.js";
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

        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            name,
            email,
            password: hashpassword
        })



        const verifyToken = crypto.randomBytes(32).toString("hex");
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