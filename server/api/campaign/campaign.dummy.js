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
    genre: 'Action'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Avengers Endgame',
    campaignTitle: 'Sad movie :(',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-05'),
    screenType: screenTypes[0]._id,
    imageUrl: 'https://www.joblo.com/assets/images/joblo/posters/2019/04/avengers_endgame_ver44_xlg.jpg',
    genre: 'Comedy'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Incredibles 2',
    campaignTitle: 'Really overrated',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[1]._id,
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Video128/v4/c5/30/bb/c530bbb7-46e8-4a06-eba4-ef59483a1ce3/pr_source.lsr/268x0w.png',
    genre: 'Superhero'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Memento',
    campaignTitle: 'Backwards movie',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[2]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    genre: 'Mystery'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Whiplash',
    campaignTitle: 'Not quite my tempo',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[3]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    genre: 'Drama'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Back to the future',
    campaignTitle: 'Timeless classic',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[3]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    genre: 'Science Fiction'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Rush',
    campaignTitle: 'Formula one rivalry',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[2]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BOWEwODJmZDItYTNmZC00OGM4LThlNDktOTQzZjIzMGQxODA4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    genre: 'Sports'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Silence of the lambs',
    campaignTitle: 'Having an old friend for dinner',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[0]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    genre: 'Superhero'
  }
]
