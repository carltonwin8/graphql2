const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();
app.set('port', process.env.PORT || 4000);

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true,
}));

app.get('/', (req,res)  => res.send('hello world'));

app.listen(app.get('port'), () =>
  console.log(`Server running on port ${app.get('port')}`)
);
