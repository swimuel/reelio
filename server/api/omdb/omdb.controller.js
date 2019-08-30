// controller files should contain the actual functions to be executed when certain api endpoints receive requests.
// this is used to call the external omdb api service for retrieving movie information
const axios = require('axios')
const config = require('../../config')

// e.g localhost:3000/api/omdb/tt0848228 (Avengers)
const getMovieById = async (req, res) => {
  const { id } = req.params
  const movie = await axios.get('http://www.omdbapi.com/?apikey=' + config.omdbApiKey + '&i=' + id)

  res.json(movie.data)
}

// e.g localhost:3000/api/omdb/search=Avengers+The
const getMoviesBySearch = async (req, res) => {
  const { search } = req.params
  const movieSearchResults = await axios.get('http://www.omdbapi.com/?apikey=' + config.omdbApiKey + '&s=' + search)

  res.json(movieSearchResults.data.Search)
}

module.exports = {
  getMovieById,
  getMoviesBySearch
}
