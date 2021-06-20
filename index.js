import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Song from './models/Song.js'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

const port = process.env.PORT || 3001
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
    .then(()=> app.listen(port, ()=>{ console.log(`Server started at http://localhost:${port}`)}))
    .catch(e => console.log(e.message))

app.get('/', async (req, res)=>{
    try {
        const songs = await Song.find().sort('name')
        res.send(songs)
    } catch (e) {
        res.json({message: e})
    }
})
app.post('/', async (req, res)=>{
    const song = new Song({
        name: req.body.name,
        cover: req.body.cover,
        artist: req.body.artist,
        audio: req.body.audio,
        color: req.body.color,
        lang: req.body.lang
    })
    try {
        const newsong = await song.save()
        res.send(newsong)
    } catch (e) {
        res.json({message :e})
    }
})