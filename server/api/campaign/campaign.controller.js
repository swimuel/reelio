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

  // try making a Date object form supplied data. If for some reason its invalid then return
  try {
    campaign.screeningDate = Date.parse(req.body.screeningDate)
  } catch (err) {
    res.json({ error: err })
    res.status(400)
    return
  }
  campaign.imageUrl = req.body.imageUrl
  campaign.genre = req.body.genre
  campaign.creatorName = req.body.creatorName
  campaign.creatorEmail = req.body.creatorEmail
  campaign.cinemaName = req.body.cinemaName
  campaign.cinemaAddress = req.body.cinemaAddress

  // Check that the screen type is in DB and populate price field
  const screenTypesList = await ScreenType.find()

  const screenTypeID = req.body.screenType
  let foundType = false
  if (screenTypesList.some(e => e._id.toString() === screenTypeID)) {
    foundType = true
  }
  if (foundType) {
    screenTypesList.forEach(function (type) {
      if (type._id.toString() === screenTypeID) {
        campaign.screenType = screenTypeID
        campaign.price = type.price
      }
    })
  } else {
    res.json('Screen Type not found for ' + screenTypeID)
    res.status(404)
    return
  }

  // save the contact and check for errors
  campaign.save(function (err) {
    if (err) {
      res.json(err)
      res.status(400)
    } else {
      res.json({ data: campaign })
      res.status(201)
    }
  })
}

module.exports = {
  getAllCampaigns,
  getCampaignById,
  newCampaign
}
