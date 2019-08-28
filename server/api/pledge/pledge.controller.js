// controller files should contain the actual functions to be executed when certain api endpoints receive requests.

// the model can be used to interact with the database entities
const Pledges = require('./pledge')

const getAllPledges = async (req, res) => {
  const pledgeList = await Pledges.find()
  res.json(pledgeList)
}

const getPledgeById = async (req, res) => {
  const { id } = req.params
  const pledge = await Pledges.findById(id)
  res.json(pledge)
}

module.exports = {
  getAllPledges,
  getPledgeById
}
