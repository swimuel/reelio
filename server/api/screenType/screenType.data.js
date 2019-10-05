const objectid = require('objectid')

module.exports = [
  {
    _id: objectid().toString(),
    name: 'IMAX_3D',
    numTicketsRequired: 50,
    adultPrice: 20,
    childPrice: 16,
    maxTicketsAvailable: 100
  },
  {
    _id: objectid().toString(),
    name: 'IMAX',
    numTicketsRequired: 50,
    adultPrice: 18,
    childPrice: 14,
    maxTicketsAvailable: 75
  },
  {
    _id: objectid().toString(),
    name: '2D',
    numTicketsRequired: 20,
    adultPrice: 14,
    childPrice: 10,
    maxTicketsAvailable: 200
  },
  {
    _id: objectid().toString(),
    name: '3D',
    numTicketsRequired: 30,
    adultPrice: 16,
    childPrice: 12,
    maxTicketsAvailable: 150
  }
]
