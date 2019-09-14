const ScreenType = require('./screenType')

const getAllScreenTypes = async (req, res) => {
  const screenTypes = await ScreenType.find()
  res.json(screenTypes)
}

module.exports = {
  getAllScreenTypes
}
