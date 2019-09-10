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
  const campaign = new Campaigns()

  campaign.filmTitle = req.body.filmTitle
  campaign.campaignTitle = req.body.campaignTitle
  campaign.creationDate = moment()
  campaign.imageUrl = req.body.imageUrl
  campaign.genre = req.body.genre
  campaign.creatorName = req.body.creatorName
  campaign.creatorEmail = req.body.creatorEmail
  campaign.cinemaName = req.body.cinemaName
  campaign.cinemaAddress = req.body.cinemaAddress

  // try making a Date object form supplied data. If for some reason its invalid then return
  try {
    campaign.screeningDate = Date.parse(req.body.screeningDate)
  } catch (err) {
    res.status(400).json({ error: err })
    return
  }

  // Check that the screen type is in DB and populate price field
  try {
    const screenTypeEntry = await ScreenType.findById(req.body.screenType)
    campaign.screenType = screenTypeEntry._id
    campaign.price = screenTypeEntry.price
  } catch (err) {
    res.status(404).json({ error: 'Screen Type not found for ' + req.body.screenType })
    return
  }

  // save the contact and check for errors
  campaign.save(function (err) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(201).json({ data: campaign })
    }
  })
}

module.exports = {
  getAllCampaigns,
  getCampaignById,
  newCampaign
}
