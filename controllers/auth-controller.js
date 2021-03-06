const Boom = require('boom');
const StatusCodes = require('http-status-codes');
const { authMsg } = require('../utils/messages');
const { generate, decode } = require('../utils/jwt-token');
const { MongoService } = require('../services/mongo-service');
const { entities } = require('../utils/constants');

const UserService = new MongoService(entities.users);

function get(req, res) {
    const payload = { ...req.query, time: Date.now() };

    UserService.getItemByField({ username: payload.username })
        .then((user) => {
            const { username, password } = decode(user.token);
            if (
                username === payload.username &&
                password === payload.password
            ) {
                const token = generate(payload);
                const cb = () => res.status(StatusCodes.OK).send({ token });
                const errCb = (error) => res.json(error);

                // eslint-disable-next-line no-underscore-dangle
                UserService.updateItem(user._id, { token })
                    .then(cb)
                    .catch(errCb);
            } else {
                res.json(Boom.badData(authMsg.BAD_CREDITS));
            }
        })
        .catch((error) => res.json(error));
}

function create(req, res) {
    const payload = {
        username: req.body.username,
        password: req.body.password,
        time: Date.now(),
    };
    const token = generate(payload);
    const newUser = {
        ...req.body,
        token,
    };
    delete newUser.password;

    const cb = () => res.status(StatusCodes.OK).send(newUser);
    const errCb = (error) => res.json(Boom.internal(error));
    UserService.addItem(newUser).then(cb).catch(errCb);
}

module.exports = {
    create,
    get,
};
