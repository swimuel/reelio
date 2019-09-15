const objectid = require('objectid')

module.exports = [
  {
    _id: objectid().toString(),
    name: 'Event Cinema Queen Street',
    address: '291-297 Queen Street, Auckland 1010'
  },
  {
    _id: objectid().toString(),
    name: 'Event Cinema Albany',
    address: '219 Don Mckinnon Drive, Albany 0632'
  },
  {
    _id: objectid().toString(),
    name: 'Hoyts Botany',
    address: '588 Chapel Road, Botany Downs 2013'
  },
  {
    _id: objectid().toString(),
    name: 'Hoyts Sylvia Park',
    address: '286 Mount Wellington Hwy, Mount Wellington 1060'
  }
]