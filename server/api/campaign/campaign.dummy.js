const objectid = require('objectid')
const screenTypes = require('../screenType/screenType.data')

module.exports = [
  {
    _id: objectid().toString(),
    filmTitle: 'Spirited Away',
    campaignTitle: 'Epic movie pls come',
    creationDate: new Date(),
    screeningDate: new Date('2019-10-02'),
    screenType: screenTypes[0]._id
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Avengers Endgame',
    campaignTitle: 'Sad movie :(',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[0]._id
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Incredibles 2',
    campaignTitle: 'Really overrated',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-04'),
    screenType: screenTypes[0]._id
  }
]
