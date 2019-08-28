const objectid = require('objectid')
const screenTypes = require('../screenType/screenType.data')

module.exports = [
  {
    _id: objectid().toString(),
    filmTitle: 'Spirited Away',
    campaignTitle: 'Epic movie pls come',
    creationDate: new Date(),
    screeningDate: new Date('2019-10-02'),
    screenType: screenTypes[0]._id,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41jOy%2BrrcHL.jpg'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Avengers Endgame',
    campaignTitle: 'Sad movie :(',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-05'),
    screenType: screenTypes[0]._id,
    imageUrl: 'https://www.joblo.com/assets/images/joblo/posters/2019/04/avengers_endgame_ver44_xlg.jpg'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Incredibles 2',
    campaignTitle: 'Really overrated',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[1]._id,
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Video128/v4/c5/30/bb/c530bbb7-46e8-4a06-eba4-ef59483a1ce3/pr_source.lsr/268x0w.png'
  }
]
