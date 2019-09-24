const mongoose = require('mongoose')
const Schema = mongoose.Schema

// see https://mongoosejs.com/docs/guide.html#definition for how to create schemas
const ScreenTypeSchema = new Schema({
  name: { type: String, required: true, enum: ['IMAX', 'IMAX_3D', '2D', '3D'] },
  numTicketsRequired: { type: Number, required: true },
  price: { type: Number, required: true },
  maxTicketsAvailable: { type: Number, required: true }
})

// method to calculate display name, by regex replacing underscores with spaces in name attribute
ScreenTypeSchema.methods.calculateDisplayName = async function () {
  return this.name.replace(/_/g, ' ')
}

module.exports = mongoose.model('ScreenType', ScreenTypeSchema)
