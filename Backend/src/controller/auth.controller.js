import { userModel } from "../models/user.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {redis} from "../config/cache.js"


export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "info is required"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }
        const isAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isAlreadyExist) {
        return res.status(400).json({
            message: "User are already exist"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username: username,
        email: email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECERT,
        { expiresIn: "7d" }
    )
    res.cookie("token", token)

    res.status(201).json({
        message: "User are successfully signup"
    })
} catch (error) {
    console.log("Error in signup Controller", error.message)
    res.status(500).json({
        message: "Internal server error "
    })
}

}
export const loginController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        }).select("+password")
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentia"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid Credential"
            })
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECERT,
            { expiresIn: "7d" }
        )
        res.cookie("token", token)

        res.status(200).json({
            message: "User are successfully login"
        })
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getMeController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password")
        res.status(200).json({
            message: "User are successfully featch",
            user
        })
    } catch (error) {
        console.log("Error in  getMeController", error.message)
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const logoutController = (req, res) => {
    const token = req.cookies.token

    res.clearCookie("token")
    redis.set(token, Date.now().toString(), 'EX', '60' * '60')
    res.status(200).json({
        message: "logout successfully."
    })
}
