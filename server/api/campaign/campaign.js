const mongoose = require('mongoose')
const Schema = mongoose.Schema

// see https://mongoosejs.com/docs/guide.html#definition for how to create schemas
const CampaignSchema = new Schema({
  filmTitle: { type: String, required: true },
  campaignTitle: { type: String, required: true },
  creationDate: { type: Date, required: true },
  screeningDate: { type: Date, required: true },
  screenType: { type: Schema.Types.ObjectId, ref: 'ScreenType', required: true }
})

module.exports = mongoose.model('Campaign', CampaignSchema)
