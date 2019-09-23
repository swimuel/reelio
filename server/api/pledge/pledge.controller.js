// controller files should contain the actual functions to be executed when certain api endpoints receive requests.

// the model can be used to interact with the database entities
const Pledges = require('./pledge')
const Campaigns = require('../campaign/campaign')

const getAllPledges = async (req, res) => {
  const pledgeList = await Pledges.find()
  res.json(pledgeList)
}

const getPledgeById = async (req, res) => {
  const { id } = req.params
  const pledge = await Pledges.findById(id)
  res.json(pledge)
}

const newPledge = async (req, res) => {
  const pledge = new Pledges()

  pledge.name = req.body.name
  pledge.email = req.body.email

  // check campaign actually exists
  try {
    const campaignEntry = await Campaigns.findById(req.body.campaign)
    pledge.campaign = campaignEntry._id
  } catch (err) {
    res.status(404).json({ error: 'Campaign not found for ' + req.body.campaign })
    return
  }

  pledge.ticketsPledged = req.body.ticketsPledged
  pledge.creditCardNumber = req.body.creditCardNumber
  pledge.creditCardExpiry = req.body.creditCardExpiry
  pledge.creditCardCVV = req.body.creditCardCVV
  pledge.creditCardName = req.body.creditCardName

  pledge.save(function (err) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(201).json({ data: pledge })
    }
  })
}

module.exports = {
  getAllPledges,
  getPledgeById,
  newPledge
}
