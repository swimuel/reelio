const { getAllCinemas } = require('./Cinema.controller')

module.exports = (server) => {
  // this function is called for any file ending in .routes.js.
  // use it to configure which controller methods are called for each route
  server.get('/api/cinemas', getAllCinemas)
}
