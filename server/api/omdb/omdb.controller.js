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

// e.g localhost:3000/api/omdb?search=Avengers+The
const getMovies = async (req, res) => {
  const { search } = req.query
  let queryStringParameters = '' // built to allow for future query parameters to be added

  // replicate this block to add new query params (currently built for retrieving suggestions from a query)
  if (search !== undefined) {
    queryStringParameters += '&s=' + search
  }

  // sends request for retrieving movie information based on query params
  const response = await axios.get('http://www.omdbapi.com/?apikey=' + config.omdbApiKey + queryStringParameters)
  res.status(200).json(response.data.Search)
}

module.exports = {
  getMovieById,
  getMovies
}
