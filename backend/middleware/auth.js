import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const auth =async(req,res,next)=>{
    try{
        const token =req.cookies.accessToken || req?.headers?.authorization.split(" ")[1]
        console.log("token",token);
       
        if(!token){
            return res.status(401).json({
                message :"provide"
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN);
        console.log("decode",decode);
        if(!decode){
            return res.status(401).json({
                message :"unauthorized access",
                success : false,
                error :true
            })
        }
        req.userId = decode.id;
        

        next();
    }
    catch(err){
        return res.status(500).json({
            message : err.message || err ,
            error : true ,
            success :false 
        })

     }
}
export default auth ;
