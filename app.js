const express = require('express');
const routes = require('./routes/employee.route');

const app = express();
const host = 'localhost';
const port = 5000;
const baseUrl = '/api';

app.use(baseUrl, routes);

app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});
