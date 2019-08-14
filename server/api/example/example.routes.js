const { getExamples, getExampleById, postExample} = require('./example.controller');

module.exports = (server) => {
    // this function is called for any file ending in .routes.js.
    // use it to configure which controller methods are called for each route
    server.get('/api/examples', getExamples);
    server.get('/api/examples/:id', getExampleById); // :id specifies that id is a route parameter
    server.post('/api/examples', postExample);
}