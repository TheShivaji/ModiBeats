import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    songUrl:{
        type:String,
        required:true
    },
    postUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
})

const songModel = mongoose.model("song"  , songSchema)

export default songModel