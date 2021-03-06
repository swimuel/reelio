const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CinemaSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  availableTimes: { type: [String], required: true }
})

module.exports = mongoose.model('Cinema', CinemaSchema)
