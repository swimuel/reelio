// controller files should contain the actual functions to be executed when certain api endpoints receive requests.

// the model can be used to interact with the database entities
const Campaigns = require('./campaign')
const ScreenType = require('../screenType/screenType')
const moment = require('moment')

const getAllCampaigns = async (req, res) => {
  const campaignList = await Campaigns.find()

  // async map functions are weird so have to use promise.all to properly await
  const dtoList = await Promise.all(campaignList.map(async campaign => {
    const dto = campaign.toObject()
    dto.percentageComplete = await campaign.calculatePercentageComplete()
    dto.campaignFinishDate = await campaign.calculateCampaignTimeRemainingInDays()
    dto.screenType = await (await ScreenType.findById(dto.screenType)).calculateDisplayName()
    return dto
  }))

  res.json(dtoList)
}

const getCampaignById = async (req, res) => {
  const { id } = req.params
  const campaign = await Campaigns.findById(id)
  const dto = campaign.toObject()
  dto.screenType = await (await ScreenType.findById(dto.screenType)).calculateDisplayName()
  res.json(dto)
}

const newCampaign = async (req, res) => {
  console.log('new campaign')
  const campaign = new Campaigns()
  campaign.filmTitle = req.body.filmTitle
  campaign.campaignTitle = req.body.campaignTitle
  campaign.creationDate = moment()
  campaign.screeningDate = Date.parse(req.body.screeningDate)
  campaign.screenType = req.body.screenType
  campaign.imageUrl = req.body.imageUrl
  campaign.genre = req.body.genre
  campaign.creatorName = req.body.creatorName
  campaign.creatorEmail = req.body.creatorEmail
  campaign.cinemaName = req.body.cinemaName
  campaign.cinemaAddress = req.body.cinemaAddress
  campaign.price = req.body.price

  // save the contact and check for errors
  campaign.save(function (err) {
    if (err) {
      res.json(err)
    } else {
      res.json({
        message: 'Done',
        data: campaign
      })
    }
  })
}

module.exports = {
  getAllCampaigns,
  getCampaignById,
  newCampaign
}
