// controller files should contain the actual functions to be executed when certain api endpoints receive requests.

// the model can be used to interact with the database entities
const Example = require('./example')

const getExamples = async (req, res) => {
    const examples = await Example.find()
    res.json(examples)
}

const getExampleById = async (req, res) => {
    // req.params contains all params from the route. "id" in this case (and probably most cases)
    const { id } = req.params
    const example = await Example.findById(id)
    res.json(example)
}

const postExample = async (req, res) => {
    const example = req.body
    const created = await Example.create(example)
    res.json(created)
}

module.exports = {
    getExampleById,
    getExamples,
    postExample
}