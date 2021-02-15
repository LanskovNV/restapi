const Boom = require('boom');
const StatusCodes = require('http-status-codes');
const { employeeMsg } = require('../utils/messages');
const { entities } = require('../utils/constants');
const { specifyService } = require('../utils/utils');
const Service = specifyService(
    require('../services/lowdb-service'),
    entities.employees,
);

function getById(req, res) {
    const id = Number.parseInt(req.params.id, 10);

    Service.getItem({ id }, employeeMsg.NOT_FOUND(id))
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

function get(req, res) {
    const filters = { ...req.query };
    delete filters.page_num;

    Service.getCollection(filters, req.query.page_num || 1)
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

function create(req, res) {
    const item = {
        ...req.body,
        salary: req.body.salary,
    };
    Service.addItem(item)
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

function update(req, res) {
    const id = Number.parseInt(req.params.id, 10);
    Service.updateItem({ id }, req.body)
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

function del(req, res) {
    const id = req.params.id;

    Service.deleteItem({ id })
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

module.exports = {
    getById,
    get,
    update,
    create,
    del,
};
