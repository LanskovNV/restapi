const express = require('express');
const passport = require('passport');
const cors = require('cors');
const { Strategy } = require('passport-http-bearer');
const routes = require('../routes');
const { verify } = require('./jwt-token');
const errorHandler = require('../middlewares/error-handler');

passport.use('bearerAuth', new Strategy(verify));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize(undefined));
app.use('/api/v1', routes);
app.use(errorHandler);

module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    app,
};
