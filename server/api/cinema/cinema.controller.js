const Cinema = require('./cinema')

const getAllCinemas = async (req, res) => {
  const Cinemas = await Cinema.find()
  res.json(Cinemas)
}

module.exports = {
  getAllCinemas
}
