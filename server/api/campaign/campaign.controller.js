// controller files should contain the actual functions to be executed when certain api endpoints receive requests.

// the model can be used to interact with the database entities
const Campaigns = require('./campaign')
const ScreenType = require('../screenType/screenType')

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

module.exports = {
  getAllCampaigns,
  getCampaignById
}
