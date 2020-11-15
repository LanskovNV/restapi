const { entities } = require('../utils/constants');
const { specifyService } = require('../utils/utils');
const { authMsg } = require('./messages');
const Service = specifyService(require('../services/lowdb-service'), entities.users);
const jwt = require('jsonwebtoken');
const secrets = require('../utils/auth-secrets');

function verify(token, done) {
    Service.getItem({ token }, authMsg.INVALID_TOKEN)
        .then(() => {
            const { username } = jwt.verify(token, secrets.auth);
            done(null, username);
        }).catch(error => done(null, false, error));
}

function decode(token, type) {
    return jwt.verify(token, secrets[type]);
}

function generate(payload, type) {
    const options = type === 'refresh' ? {} : { expiresIn: '5m' };
    return jwt.sign(payload, secrets[type], options);
}

module.exports = {
    verify,
    generate,
    decode
};
