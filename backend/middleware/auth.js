import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    let token;

    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Access token required",
        success: false,
        error: true
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
        error: true
      });
    }

    req.userId = decode.id;
    console.log("decode", decode);

    next();
  } catch (err) {
    return res.status(401).json({
      message: err.message || err,
      success: false,
      error: true
    });
  }
};

export default auth;
