const Boom = require('boom');
const StatusCodes = require('http-status-codes');
const { authMsg } = require('../utils/messages');
const { generate, decode } = require('../utils/jwt-token');
const { entities, authTokenTypes } = require('../utils/constants');
const { specifyService } = require('../utils/utils');
const UsersService = specifyService(
  require('../services/lowdb-service'),
  entities.users,
);

function get(req, res) {
  const payload = { ...req.query, time: Date.now() };

  UsersService.getItem({ username: payload.username }, authMsg.INVALID_TOKEN)
    .then((user) => {
      const { username, password } = decode(user.token, authTokenTypes.auth);
      if (username === payload.username && password === payload.password) {
        const token = generate(payload, authTokenTypes.auth);
        const cb = () => res.status(StatusCodes.OK).send({ token });
        const errCb = (error) => res.json(error);

        UsersService.updateItem({ username: payload.username }, { token })
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
  const token = generate(payload, authTokenTypes.auth);
  const newUser = {
    ...req.body,
    token,
  };
  delete newUser.password;

  const cb = () => res.status(StatusCodes.OK).send(newUser);
  const errCb = (error) => res.json(Boom.internal(error));
  UsersService.addItem(newUser).then(cb).catch(errCb);
}

module.exports = {
  create,
  get,
};
