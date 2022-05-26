const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Albums = require('./models/albums.js')

const app = express()

app.use(express.json())
app.use(cors())


app.post('/albums', (req, res) => {
		Albums.create(req.body, (err, createdAlbums) => {
					res.json(createdAlbums)
		})
})

app.get('/albums', (req, res) => {
		Albums.find({}, (req, foundAlbums) => {
				res.json(foundAlbums)
		})
})

app.delete('/albums/:id', (req, res) => {
		Albums.findByIdAndRemove(req.params.id, (err, deletedAlbum) => {
				res.json(deletedAlbum)

		})
})

app.put('/albums/:id', (req, res) => {
		Albums.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedAlbum) => {
				res.json(updatedAlbum)
		})
})

app.listen(3000, () => {
	console.log('listening...');
})


mongoose.connect('mongodb://127.0.0.1:27017/albums')
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod...')
})
