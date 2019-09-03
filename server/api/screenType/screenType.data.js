const objectid = require('objectid')

module.exports = [
  {
    _id: objectid().toString(),
    name: 'IMAX_3D',
    numTicketsRequired: 50,
    price: 12
  },
  {
    _id: objectid().toString(),
    name: 'IMAX',
    numTicketsRequired: 50,
    price: 15
  },
  {
    _id: objectid().toString(),
    name: '2D',
    numTicketsRequired: 20,
    price: 5
  },
  {
    _id: objectid().toString(),
    name: '3D',
    numTicketsRequired: 30,
    price: 10
  }
]
