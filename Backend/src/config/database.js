import mongoose from "mongoose"

export const connectDb = async() =>{
    await mongoose.connect(process.env.MOGODB_URL)
    console.log("DB is connected")
}