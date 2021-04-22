const Boom = require('boom');
const StatusCodes = require('http-status-codes');
const { authMsg } = require('../utils/messages');
const { generate, decode } = require('../utils/jwt-token');
const { MongoService } = require('../services/mongo-service');
const { entities } = require('../utils/constants');

const UserService = new MongoService(entities.users);

async function get(req, res, next) {
    const payload = { ...req.query, time: Date.now() };

    try {
        const user = await UserService.getItemByField({
            username: payload.username,
        });
        const { username, password } = decode(user.token);
        if (username === payload.username && password === payload.password) {
            const token = generate(payload);
            // eslint-disable-next-line no-underscore-dangle
            const data = await UserService.updateItem(user._id, {
                token,
            });
            res.status(StatusCodes.OK).send({ ...data, token });
        } else {
            throw Boom.badRequest('Incorrect login or password');
        }
    } catch (err) {
        next(err);
    }
}

function create(req, res, next) {
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
