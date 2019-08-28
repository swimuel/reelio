const objectid = require('objectid')

module.exports = [
  {
    _id: objectid().toString(),
    name: 'IMAX_3D',
    numTicketsRequired: 50
  },
  {
    _id: objectid().toString(),
    name: 'IMAX',
    numTicketsRequired: 50
  }
]
