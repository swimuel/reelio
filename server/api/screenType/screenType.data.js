const objectid = require('objectid')

module.exports = [
  {
    _id: objectid().toString(),
    name: 'IMAX',
    numTicketsRequired: 10
  }
]
