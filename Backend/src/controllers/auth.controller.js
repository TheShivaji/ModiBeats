const jwt = require("jsonwebtoken")
const User = require("../models/user.models")
const bcrypt = require("bcrypt")
const blackModel = require("../models/blocklist.models")

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(404).json({
                message: "Please provide information"
            })
        }

        const isAlreadyExist = await User.findOne({
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
            username,
            email,
            password: hash
        })

        const token = jwt.sign({
            id: user._id
        },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token)
        res.status(201).json({
            message: "Account is successfully signup"
        })

    } catch (error) {
        console.log("Error in  signupController", error.message)
    }

}

const loginController = async (req, res) => {


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
                message: "User not found"
            })
        }

        const isPasswordVaild = await bcrypt.compare(password, user.password)

        if (!isPasswordVaild) {
            return res.status(400).json({
                message: "Password is invalid"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
        res.cookie("token", token)

        res.status(201).json({
            message: "User login sucessfully"
        })

    } catch (error) {
        console.log("Error in loginController", error.message)
    }

}

const getmeController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password")

        res.status(200).json({
            message: "User are successfully featch",
            user
        })
    } catch (error) {
        console.log("Error in getmeController", error.message)

        res.status(500).json({
            error: "Internal server error"
        })
    }
}

const logoutController = async (req, res) => {
    const token = req.cookies.token

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })
    await blackModel.findOneAndUpdate(
        { token },
        { token },
        { upsert: true }
    )

    res.status(200).json({
        message: "logout sucessfully"
    })
}


module.exports = {
    signupController,
    loginController,
    getmeController,
    logoutController
}