const mongoose = require("mongoose")


const createSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is requried"],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("User" , createSchema)

module.exports = userModel