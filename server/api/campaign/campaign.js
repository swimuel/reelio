const mongoose = require('mongoose')
const ScreenType = require('../screenType/screenType')
const Pledge = require('../pledge/pledge')
const moment = require('moment')

const Schema = mongoose.Schema

// see https://mongoosejs.com/docs/guide.html#definition for how to create schemas
const CampaignSchema = new Schema({
  filmTitle: { type: String, required: true },
  campaignTitle: { type: String, required: true },
  creationDate: { type: Date, required: true },
  screeningDate: { type: Date, required: true },
  screenType: { type: Schema.Types.ObjectId, ref: 'ScreenType', required: true }
})

CampaignSchema.methods.calculatePercentageComplete = async function () {
  const campaignId = this._id

  // get all pledges for this campaign and determine number of total tickets
  const pledges = await Pledge
    .find({ campaign: campaignId })
    .select('ticketsPledged')

  let totalPledged = 0
  pledges.forEach(pledge => {
    totalPledged += pledge.ticketsPledged
  })

  // find screen type information for this campaign to compute total tickets required
  const screenType = await ScreenType.findById(this.screenType)

  return totalPledged / screenType.numTicketsRequired * 100
}

CampaignSchema.methods.calculateCampaignTimeRemainingInDays = async function () {
  // translates a Date object into a Moment object
  const screeningDate = moment(this.screeningDate)

  // Calculates the campaigns finish date as a week before the screening date
  const cutOffDate = screeningDate.subtract(7, 'days')
  return cutOffDate
}

module.exports = mongoose.model('Campaign', CampaignSchema)
