const { entities } = require('../utils/constants');
const { specifyService } = require('../utils/utils');
const { authMsg } = require('./messages');
const UsersService = specifyService(
    require('../services/lowdb-service'),
    entities.users,
);
const jwt = require('jsonwebtoken');
const secrets = require('../utils/auth-secrets');

function verify(token, done) {
    UsersService.getItem({ token }, authMsg.INVALID_TOKEN)
        .then(() => {
            const { username } = jwt.verify(token, secrets.auth);
            done(null, username);
        })
        .catch((error) => done(null, false, error));
}

function decode(token, type) {
    return jwt.verify(token, secrets[type], { ignoreExpiration: true });
}

function generate(payload, type) {
    return jwt.sign(payload, secrets[type], { expiresIn: '5m' });
}

module.exports = {
    verify,
    generate,
    decode,
};
