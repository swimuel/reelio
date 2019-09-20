const campaigns = require('../campaign/campaign.dummy')

module.exports = [
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[0]._id,
    ticketsPledged: 5,
    creditCardNumber: '1234567891123456',
    creditCardExpiry: new Date('2020-12-01'),
    creditCardCVV: '987',
    creditCardName: 'That Person'
  },
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[0]._id,
    ticketsPledged: 5,
    creditCardNumber: '2468101234123456',
    creditCardExpiry: new Date('2020-05-01'),
    creditCardCVV: '123',
    creditCardName: 'Random'
  },
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[1]._id,
    ticketsPledged: 9,
    creditCardNumber: '1357911121234561',
    creditCardExpiry: new Date('2021-02-01'),
    creditCardCVV: '567',
    creditCardName: 'Whats his face'
  },
  {
    name: 'Testy Bro',
    email: 'test@yo.com',
    campaign: campaigns[2]._id,
    ticketsPledged: 1,
    creditCardNumber: '1234567876123456',
    creditCardExpiry: new Date('2021-08-01'),
    creditCardCVV: '123',
    creditCardName: 'Person'
  }
]
