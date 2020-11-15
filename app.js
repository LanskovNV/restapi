const { host, port, app } = require('./utils/config');

app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});
