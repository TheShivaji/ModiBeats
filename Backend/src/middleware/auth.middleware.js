const jwt = require("jsonwebtoken")
const blackModel = require("../models/blocklist.models")

const authUser = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "Token not provided"
    })
  }

  try {
    //  Step 1: verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Step 2: check blacklist
    const isBlacklisted = await blackModel.findOne({ token })

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token is blacklisted"
      })
    }

    req.user = decoded
    next()

  } catch (error) {
    console.log("Auth error:", error.message)

    return res.status(401).json({
      message: "Invalid token"
    })
  }
}

module.exports = { authUser }