const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
		name: String,
		artist: String,
   	genre: String,
   	image: String,
   	year: Number
})


const Albums = mongoose.model('Albums', albumSchema)

module.exports = Albums
