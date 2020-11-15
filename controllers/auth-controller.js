const Boom = require('boom');
const StatusCodes = require('http-status-codes');
const { authMsg } = require('../utils/messages');
const { generate, decode } = require('../utils/jwt-token');
const { entities, authTokenTypes } = require('../utils/constants');
const { specifyService, handleRequests } = require('../utils/utils');
const UsersService = specifyService(require('../services/lowdb-service'), entities.users);
const TokensService = specifyService(require('../services/lowdb-service'), entities.tokens);

function get(req, res) {
    const payload = req.body;
    const { username, password } = decode(payload.refreshToken, authTokenTypes.refresh);

    TokensService.getItem({token: payload.refreshToken}, authMsg.INVALID_TOKEN)
        .then(() => {
            if (username === payload.username && password.toString() === payload.password) {
                const token = generate(payload, authTokenTypes.auth);
                const refreshToken = generate(payload, authTokenTypes.refresh);

                const cb = () => res.status(StatusCodes.OK).send({ token, refreshToken });
                const errCb = error => res.json(error);
                const requests = [
                    () => UsersService.updateItem({ username: payload.username }, { token }),
                    () => TokensService.updateItem({ token: payload.refreshToken }, { token: refreshToken }),
                ];
                handleRequests(requests, cb, errCb);
            } else {
                res.json(Boom.badData(authMsg.BAD_CREDITS));
            }
        })
        .catch(error => res.json(error))
}

function create(req, res) {
    const payload = { username: req.body.username, password: req.body.password, time: Date.now() };
    const token = generate(payload, authTokenTypes.auth);
    const refreshToken = generate(payload, authTokenTypes.refresh);
    const newUser = {
        ...req.body,
        token
    };
    delete newUser.password;

    const cb = () => res.status(StatusCodes.OK).send({ ...newUser, refreshToken });
    const errCb = error => res.json(Boom.internal(error));
    const requests = [
        () => UsersService.addItem(newUser),
        () => TokensService.addItem({ token: refreshToken }),
    ];
    handleRequests(requests, cb, errCb);
}

module.exports = {
    create,
    get
}
