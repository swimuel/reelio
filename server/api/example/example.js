// this is a file defining the database schema for the given entity.
// i.e. this defines the "example" entity, which can be interacted with via the
// api/example endpoint (as configured in the routes file).

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// see https://mongoosejs.com/docs/guide.html#definition for how to create schemas
const ExampleSchema = new Schema({
  title: String,
  content: String
})

module.exports = mongoose.model('Example', ExampleSchema)
