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
    genre: 'Action',
    creatorName: 'Joe Smith',
    creatorEmail: 'joe@gmail.com',
    cinemaName: 'Event Cinema Queen Street',
    cinemaAddress: '291-297 Queen Street, Auckland 1010',
    price: screenTypes[0].price,
    imdbID: 'tt0245429'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Avengers: Endgame',
    campaignTitle: 'Sad movie :(',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-05'),
    screenType: screenTypes[0]._id,
    imageUrl: 'https://www.joblo.com/assets/images/joblo/posters/2019/04/avengers_endgame_ver44_xlg.jpg',
    genre: 'Comedy',
    creatorName: 'Hannah McDonald',
    creatorEmail: 'hannah@gmail.com',
    cinemaName: 'Event Cinema Albany',
    cinemaAddress: '219 Don Mckinnon Drive, Albany 0632',
    price: screenTypes[0].price,
    imdbID: 'tt4154796'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'The Incredibles 2',
    campaignTitle: 'Really overrated',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[1]._id,
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Video128/v4/c5/30/bb/c530bbb7-46e8-4a06-eba4-ef59483a1ce3/pr_source.lsr/268x0w.png',
    genre: 'Superhero',
    creatorName: 'Ryan Hall',
    creatorEmail: 'ryan@gmail.com',
    cinemaName: 'Hoyts Botany',
    cinemaAddress: '588 Chapel Road, Botany Downs 2013',
    price: screenTypes[1].price,
    imdbID: 'tt3606756'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Memento',
    campaignTitle: 'Backwards movie',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[2]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    genre: 'Mystery',
    creatorName: 'Ryan Hall5',
    creatorEmail: 'ryan@gmail.com',
    cinemaName: 'Hoyts Botany',
    cinemaAddress: '588 Chapel Road, Botany Downs 2013',
    price: screenTypes[1].price,
    imdbID: 'tt0209144'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Whiplash',
    campaignTitle: 'Not quite my tempo',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[3]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    genre: 'Drama',
    creatorName: 'Ryan Hall4',
    creatorEmail: 'ryan4@gmail.com',
    cinemaName: 'Hoyts Botany',
    cinemaAddress: '588 Chapel Road, Botany Downs 2013',
    price: screenTypes[1].price,
    imdbID: 'tt2582802'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Back to the Future',
    campaignTitle: 'Timeless classic',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[3]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    genre: 'Science Fiction',
    creatorName: 'Ryan Three',
    creatorEmail: 'ryan3@gmail.com',
    cinemaName: 'Hoyts Botany',
    cinemaAddress: '588 Chapel Road, Botany Downs 2013',
    price: screenTypes[1].price,
    imdbID: 'tt0088763'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'Rush',
    campaignTitle: 'Formula 1 rivalry',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[2]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BOWEwODJmZDItYTNmZC00OGM4LThlNDktOTQzZjIzMGQxODA4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    genre: 'Sports',
    creatorName: 'Ryan Hall2',
    creatorEmail: 'ryan2@gmail.com',
    cinemaName: 'Hoyts Botany',
    cinemaAddress: '588 Chapel Road, Botany Downs 2013',
    price: screenTypes[1].price,
    imdbID: 'tt1979320'
  },
  {
    _id: objectid().toString(),
    filmTitle: 'The Silence of the Lambs',
    campaignTitle: 'Having an old friend for dinner',
    creationDate: new Date(),
    screeningDate: new Date('2019-09-06'),
    screenType: screenTypes[0]._id,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    genre: 'Superhero',
    creatorName: 'Ryan Hall',
    creatorEmail: 'ryan@gmail.com',
    cinemaName: 'Hoyts Botany',
    cinemaAddress: '588 Chapel Road, Botany Downs 2013',
    price: screenTypes[1].price,
    imdbID: 'tt0102926'
  }
]
