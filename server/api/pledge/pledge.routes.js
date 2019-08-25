const { getAllPledges, getPledgeById } = require('./pledge.controller')

module.exports = (server) => {
  // this function is called for any file ending in .routes.js.
  // use it to configure which controller methods are called for each route
  server.get('/api/pledges', getAllPledges)
  server.get('/api/pledges/:id', getPledgeById) // :id specifies that id is a route parameter
}
