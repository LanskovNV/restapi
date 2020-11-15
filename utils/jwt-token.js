const { collections, entities } = require('../utils/constants');
const { specifyService } = require('../utils/utils');
const { authMsg } = require('./messages');
const Service = specifyService(require('../services/lowdb-service'), entities.auth);
const jwt = require('jsonwebtoken');
const { authSecret } = require('../utils/auth-secrets');

function verify(token, done) {
    Service.getItem(collections.users, { token }, authMsg.INVALID_TOKEN)
        .then(() => {
            const { username } = jwt.verify(token, authSecret);
            done(null, username);
        }).catch(error => done(null, false, error));
}

function decode(token) {
    return jwt.verify(token, authSecret);
}

function generate(payload) {
    return jwt.sign(payload, authSecret, { expiresIn: '5m' });
}

module.exports = {
    verify,
    generate,
    decode
};
