const express = require('express');
const bodyParser = require('body-parser');
const glob = require('glob');
const mongoose = require('mongoose')
const Example = require('./api/example/example')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
const dbUrl = 'mongodb://localhost/reelio'
mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true })
.then(async () => {
  console.log(`mongo connected at ${dbUrl}`)
  // clear database.
  // add all models to be cleared here
  await Promise.all([
    Example.deleteMany({})
  ]);

  // init data
  // require all dummy data here and init using insertMany
  const examples = require('./api/example/example.dummy')
  try {
    await Example.insertMany(examples)
  } catch (e) {
    console.log(`error initializing data: ${e}`)
  }

  // REST API routes
  // configures all REST API routes automatically
  // const rootPath = require('path').join(__dirname, '/..')
  glob.sync(__dirname + '/api/**/*.routes.js').forEach(controllerPath => {
    if (!controllerPath.includes('.spec.js')) require(controllerPath)(app)
  })

  app.listen(port, () => console.log(`Listening on port ${port}`));
})