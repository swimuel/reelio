const { getMovieById, getMoviesBySearch } = require('./omdb.controller')

module.exports = (server) => {
  // this function is called for any file ending in .routes.js.
  // use it to configure which controller methods are called for each route
  server.get('/api/omdb', getMoviesBySearch)
  server.get('/api/omdb/:id', getMovieById) // :id specifies that id is a route parameter
}
