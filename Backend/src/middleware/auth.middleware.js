import jwt from "jsonwebtoken" 
import {redis} from "../config/cache.js"

export const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const isBlacklisted = await redis.get(token)

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Token revoked"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECERT)

        req.user = decoded

        next()

    } catch (error) {
        console.error("Auth Middleware Error:", error.message)

        return res.status(401).json({
            message: "Invalid or Expired Token"
        })
    }
}