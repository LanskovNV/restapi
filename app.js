require('dotenv').config();
const { host, port, app } = require('./utils/config');
const { connectDb } = require('./services/mongo-service');

function startServer() {
    app.listen(port, host, () => {
        console.log(`Server listens http://${host}:${port}`);
    });
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);
