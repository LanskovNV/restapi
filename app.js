const express = require('express');
const routes = require('./routes');


// Setting up main app configuration
const host = 'localhost';
const port = 5000;
const baseUrl = '/api';

// Configuring express application
const app = express();
app.use(baseUrl, routes);
app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});
