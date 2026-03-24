const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

const authRouter = express.Router()

authRouter.post("/signup" , authController.signupController)
authRouter.post("/login" , authController.loginController)
authRouter.get("/get-me" , authMiddleware.authUser , authController.getmeController)
authRouter.get("/logout" , authMiddleware.authUser , authController.getmeController)



module.exports = authRouter