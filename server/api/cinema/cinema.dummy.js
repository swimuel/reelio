const objectid = require('objectid')

module.exports = [
  {
    _id: objectid().toString(),
    name: 'Event Cinema Queen Street',
    address: '291-297 Queen Street, Auckland 1010',
    availableTimes: ['1:00 pm', '2:00 pm', '11:30 am']
  },
  {
    _id: objectid().toString(),
    name: 'Event Cinema Albany',
    address: '219 Don Mckinnon Drive, Albany 0632',
    availableTimes: ['11:00 pm', '8:30 am', '5:30 pm']
  },
  {
    _id: objectid().toString(),
    name: 'Hoyts Botany',
    address: '588 Chapel Road, Botany Downs 2013',
    availableTimes: ['10:00 am', '8:30 pm', '4:30 pm']
  },
  {
    _id: objectid().toString(),
    name: 'Hoyts Sylvia Park',
    address: '286 Mount Wellington Hwy, Mount Wellington 1060',
    availableTimes: ['1:30 pm', '3:00 pm', '7:00 pm']
  }
]
