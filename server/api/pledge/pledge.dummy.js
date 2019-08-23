const campaigns = require('../campaign/campaign.dummy')

module.exports = [
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[0]._id,
    ticketsPledged: 5
  }
]
