const express = require('express');
const routes = require('./routes');
const { host, port, baseUrl } = require('./utils/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(baseUrl, routes);

app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});
