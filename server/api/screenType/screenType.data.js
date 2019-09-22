const objectid = require('objectid')

module.exports = [
  {
    _id: objectid().toString(),
    name: 'IMAX_3D',
    numTicketsRequired: 50,
    price: 12,
    maxTicketsAvailable: 100
  },
  {
    _id: objectid().toString(),
    name: 'IMAX',
    numTicketsRequired: 50,
    price: 15,
    maxTicketsAvailable: 75
  },
  {
    _id: objectid().toString(),
    name: '2D',
    numTicketsRequired: 20,
    price: 5,
    maxTicketsAvailable: 200
  },
  {
    _id: objectid().toString(),
    name: '3D',
    numTicketsRequired: 30,
    price: 10,
    maxTicketsAvailable: 150
  }
]
