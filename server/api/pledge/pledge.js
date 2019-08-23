const mongoose = require('mongoose')
const Schema = mongoose.Schema

// see https://mongoosejs.com/docs/guide.html#definition for how to create schemas
const PledgeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  ticketsPledged: { type: Number, required: true }
})

module.exports = mongoose.model('Pledge', PledgeSchema)
