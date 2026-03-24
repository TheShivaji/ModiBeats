const express = require("express")
const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/signup" , authController.signupController)
authRouter.post("/login" , authController.loginController)



module.exports = authRouter