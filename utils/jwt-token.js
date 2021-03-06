const jwt = require('jsonwebtoken');
const { entities } = require('./constants');
const { MongoService } = require('../services/mongo-service');

const UserService = new MongoService(entities.users);

const secret = process.env.AUTH_SECRET;

function verify(token, done) {
    UserService.getItemByField({ token })
        .then(() => {
            const { username } = jwt.verify(token, secret);
            done(null, username);
        })
        .catch((error) => done(null, false, error));
}

function decode(token) {
    return jwt.verify(token, secret, { ignoreExpiration: true });
}

function generate(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

module.exports = {
    verify,
    generate,
    decode,
};
