const { getAllCampaigns, getCampaignById } = require('./campaign.controller')

module.exports = (server) => {
  // this function is called for any file ending in .routes.js.
  // use it to configure which controller methods are called for each route
  server.get('/api/campaigns', getAllCampaigns)
  server.get('/api/campaigns/:id', getCampaignById) // :id specifies that id is a route parameter
}
