const express = require('express')
const bodyParser = require('body-parser')
const glob = require('glob')
const mongoose = require('mongoose')
const Example = require('./api/example/example')
const Campaign = require('./api/campaign/campaign')
const Pledge = require('./api/pledge/pledge')
const ScreenType = require('./api/screenType/screenType')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connect to database
const dbUrl = 'mongodb://localhost/reelio'
mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true })
  .then(async () => {
    console.log(`mongo connected at ${dbUrl}`)
    // clear database.
    // add all models to be cleared here
    await Promise.all([
      Example.deleteMany({}),
      Campaign.deleteMany({}),
      Pledge.deleteMany({}),
      ScreenType.deleteMany({})
    ])

    // init data
    // require all dummy data here and init using insertMany
    const examples = require('./api/example/example.dummy')
    const campaigns = require('./api/campaign/campaign.dummy')
    const pledges = require('./api/pledge/pledge.dummy')

    // this data is used for production (i.e. it is not dummy data. Should be configured in the code)
    const screenTypes = require('./api/screenType/screenType.data')
    try {
      await Example.insertMany(examples)
      await ScreenType.insertMany(screenTypes)
      await Campaign.insertMany(campaigns)
      await Pledge.insertMany(pledges)
    } catch (e) {
      console.log(`error initializing data: ${e}`)
    }

    // REST API routes
    // configures all REST API routes automatically
    const routesPaths = require('path').join(__dirname, '/api/**/*.routes.js')
    glob.sync(routesPaths).forEach(controllerPath => {
      if (!controllerPath.includes('.spec.js')) require(controllerPath)(app)
    })

    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
