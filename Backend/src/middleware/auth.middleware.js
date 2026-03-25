import jwt from "jsonwebtoken"
import {redis} from "../config/cache.js"

export const authUser = async (req , res , next) =>{
const token = req.cookies.token
if(!token){
    return res.status(401).json({
        message : "Unauthorized token"
    })
}

const blackList = await redis.get(token)

if(blackList){
    return res.status(401).json({
        message : "Invalid token"
    })
}
let decoded;
try {
    decoded = jwt.verify(token , process.env.JWT_SECERT)

    req.user = decoded

    next()

} catch (error) {
    console.log("Error in authMiddleware" , error.message)
    return res.status(401).json({ 
            message: "Invalid or Expired Token", 
            error: error.message 
        });
}
}