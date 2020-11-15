const Boom = require('boom');
const { authMsg } = require('../utils/messages');
const StatusCodes = require('http-status-codes');
const { generate, decode } = require('../utils/jwt-token');
const { collections, entities } = require('../utils/constants');
const { specifyService } = require('../utils/utils');
const Service = specifyService(require('../services/lowdb-service'), entities.auth);

function update(req, res) {
    const payload = req.body;
    Service.getItem(collections.users, { username: payload.username }, authMsg.NOT_FOUND(payload.username))
        .then(() => res.status(StatusCodes.OK).send({ token: generate(payload) }))
        .catch(error => res.json(error))
}

function create(req, res) {
    const token = generate({ username: req.body.username, password: req.body.password })
    const newUser = {
        ...req.body,
        token
    };
    delete newUser.password;
    Service.addItem(collections.users, newUser)
        .then(() => res.status(StatusCodes.OK).send(newUser))
        .catch(error => res.json(Boom.internal(error)));
}

module.exports = {
    create,
    update
}
