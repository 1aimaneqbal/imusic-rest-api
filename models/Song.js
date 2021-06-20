import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
    name: String,
    cover: String,
    artist: String,
    audio: String,
    id: String,
    color: [],
    lang: String,
    active:{
        type: Boolean,
        default: false
    }
})

const Song = mongoose.model("Song", songSchema)

export default Song