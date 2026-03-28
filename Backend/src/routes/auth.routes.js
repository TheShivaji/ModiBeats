import express from "express";
import { loginController, signup, getMeController, logoutController , refreshController } from "../controller/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = (express.Router())

authRouter.post("/signup", signup)
authRouter.post("/login", loginController)
authRouter.get("/get-me", authUser, getMeController)
authRouter.get("/logout", authUser, logoutController)
authRouter.post("/refresh-token" , refreshController)


export default authRouter