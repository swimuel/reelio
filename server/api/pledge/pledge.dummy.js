const campaigns = require('../campaign/campaign.dummy')
const objectid = require('objectid')

module.exports = [
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[0]._id,
    ticketsPledged: 5
  },
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[0]._id,
    ticketsPledged: 15
  },
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: objectid(),
    ticketsPledged: 15
  }
]
