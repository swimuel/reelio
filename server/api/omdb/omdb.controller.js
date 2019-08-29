// controller files should contain the actual functions to be executed when certain api endpoints receive requests.
// this is used to call the external omdb api service for retrieving movie information
const axios = require('axios')
const { config } = require('../../config.js')

const getMovieById = async (req, res) => {
  const { id } = req.params

  // insert movie logic here
  console.log('PRINTING STUFF YEAH:')
  console.log('http://www.omdbapi.com/?apikey=' + config.omdbApiKey + '&i=' + id)
  console.log('CONFIG STUFF: ' + config.omdbApiKey)
  // const movie = axios.get('http://www.omdbapi.com/?apikey=' + config.omdbApiKey + '&i=' + id)

  const example = {
    hello: 'yeah'
  }

  res.json(example)
}

module.exports = {
  getMovieById
}
