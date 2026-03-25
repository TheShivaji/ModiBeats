import express from "express";
import { loginController, signup, getMeController, logoutController } from "../controller/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = (express.Router())

authRouter.post("/signup", signup)
authRouter.post("/login", loginController)
authRouter.get("/get-me", authUser, getMeController)
authRouter.get("/logout", authUser, logoutController)


export default authRouter