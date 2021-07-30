const express = require('express');
require('./mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
app.use('/books', graphqlHTTP({
    schema,
    graphiql:true
}));
app.listen(4000,()=> console.log('now listenning'));