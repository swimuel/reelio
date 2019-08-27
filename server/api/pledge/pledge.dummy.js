const campaigns = require('../campaign/campaign.dummy')

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
    ticketsPledged: 5
  },
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[1]._id,
    ticketsPledged: 9
  },
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[2]._id,
    ticketsPledged: 1
  }
]
