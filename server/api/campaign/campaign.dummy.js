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
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41jOy%2BrrcHL.jpg',
    creatorName: 'Joe Smith',
    creatorEmail: 'joe@gmail.com',
    cinemaName: 'Event Cinema Queen Street',
    cinemaAddress: '291-297 Queen Street, Auckland 1010',
    price: screenTypes[0].price
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Avengers Endgame',
    campaignTitle: 'Sad movie :(',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-05'),
    screenType: screenTypes[0]._id,
    imageUrl: 'https://www.joblo.com/assets/images/joblo/posters/2019/04/avengers_endgame_ver44_xlg.jpg',
    creatorName: 'Hannah McDonald',
    creatorEmail: 'hannah@gmail.com',
    cinemaName: 'Event Cinema Albany',
    cinemaAddress: '219 Don Mckinnon Drive, Albany 0632',
    price: screenTypes[0].price
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Incredibles 2',
    campaignTitle: 'Really overrated',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[1]._id,
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Video128/v4/c5/30/bb/c530bbb7-46e8-4a06-eba4-ef59483a1ce3/pr_source.lsr/268x0w.png',
    creatorName: 'Ryan Hall',
    creatorEmail: 'ryan@gmail.com',
    cinemaName: 'Hoyts Botany',
    cinemaAddress: '588 Chapel Road, Botany Downs 2013',
    price: screenTypes[1].price
  }
]
