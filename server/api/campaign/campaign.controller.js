// controller files should contain the actual functions to be executed when certain api endpoints receive requests.

// the model can be used to interact with the database entities
const Campaigns = require('./campaign')

const getAllCampaigns = async (req, res) => {
  const campaignList = await Campaigns.find()
  res.json(campaignList)
}

module.exports = {
  getAllCampaigns
}
