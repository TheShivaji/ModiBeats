import {Router} from "express"
import upload from "../middleware/upload.middleware.js"
import { uploadSong } from "../controller/song.controller.js"

const songRouter = Router()

songRouter.post('/' , upload.single("song") , uploadSong)


export default songRouter