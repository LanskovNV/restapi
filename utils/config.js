const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-http-bearer');
const routes = require('../routes');
const { verify } = require('../utils/jwt-token');

passport.use('bearerAuth', new Strategy(verify));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize(undefined));
app.use('/api/v1', routes);

module.exports = {
  host: 'localhost',
  port: 5000,
  app,
};
