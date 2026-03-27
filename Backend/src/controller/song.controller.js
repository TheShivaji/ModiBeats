import id3 from "node-id3"
import uploadFile from "../services/storage.services.js"
import songModel from "../models/song.model.js"
export const uploadSong = async (req, res) => {

    const songBuffer = req.file.buffer

    const tags = id3.read(songBuffer)
    console.log(tags)

    if (!tags.image) {
            return res.status(400).json({ message: "Bhai, gaane mein photo nahi hai!" });
        }

    const [songFile, postFile] = await Promise.all([
        uploadFile({
            buffer: songBuffer,
            filename: tags.title + "mp3",
            folder: "/modify/songs"
        }),
        uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + "jpg",
            folder: "/modify/post"
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        songUrl: songFile.url,
        postUrl: postFile.url,
        mood
    })

    res.status(201).json({
        message: "song are successfully  created"
    })
}