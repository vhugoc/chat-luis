const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const { database_auth } = require('./configs/credentials.json');

const app = express();

mongoose.connect(`mongodb+srv://${database_auth.user}:${database_auth.password}@${database_auth.uri}/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(router);

app.listen(3030, () => {
  console.log('Listening on port 3030');
});
