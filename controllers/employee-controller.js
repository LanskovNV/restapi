const Boom = require('boom');
const StatusCodes = require('http-status-codes');
const { employeeMsg } = require('../utils/messages');
const { employeeCollection } = require('../utils/constants');
const { specifyService } = require('../utils/utils');
const Service = specifyService(require('../services/lowdb-service'), employeeCollection);

function getById(req, res) {
    const employeeId = Number.parseInt(req.params.id, 10);
    if (!employeeId && employeeId !== 0) {
        return res.json(Boom.badRequest(employeeMsg.BAD_ID(req.params.id)));
    }

    Service.getItem(employeeId)
        .then(data => res.status(StatusCodes.OK).send(data))
        .catch(() => res.json(Boom.notFound(employeeMsg.NOT_FOUND(employeeId))));
}

function get(req, res) {
    Service.getCollection()
        .then(data => res.status(StatusCodes.OK).send(data))
        .catch(() => res.json(Boom.notFound(employeeMsg.NO_COLLECTION)));
}

function create(req, res) {
    Service.addItem(req.body)
        .then(data => res.status(StatusCodes.OK).send(data))
        .catch(error => res.json(Boom.internal(error)));
}

function update(req, res) {
    const employeeId = Number.parseInt(req.params.id, 10);
    Service.updateItem(employeeId, req.body)
        .then(data => res.status(StatusCodes.OK).send(data))
        .catch(error => res.json(Boom.internal(error)));
}

function del(req, res) {
    const employeeId = Number.parseInt(req.params.id, 10);
    if (!employeeId && employeeId !== 0) {
        return res.json(Boom.badRequest(employeeMsg.BAD_ID(req.params.id)));
    }

    Service.deleteItem(employeeId)
        .then(data => res.status(StatusCodes.OK).send(data))
        .catch(() => res.json(Boom.notFound(employeeMsg.NOT_FOUND(employeeId))));
}

module.exports = {
    getById,
    get,
    update,
    create,
    del
};
