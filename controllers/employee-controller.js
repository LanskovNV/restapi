const StatusCodes = require('http-status-codes');
const { entities } = require('../utils/constants');
const { MongoService } = require('../services/mongo-service');

const EmployeeService = new MongoService(entities.employees);

function getById(req, res) {
    const { id } = req.params;

    EmployeeService.getItem(id)
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

function get(req, res) {
    const filters = { ...req.query };
    delete filters.page_num;
    delete filters.order;
    const order = req.query.order ? Number.parseInt(req.query.order, 10) : -1;

    EmployeeService.getCollection(filters, req.query.page_num || 1, order)
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

function create(req, res) {
    EmployeeService.addItem(req.body)
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

function update(req, res) {
    const { id } = req.params;
    EmployeeService.updateItem(id, req.body)
        .then((data) => res.status(StatusCodes.OK).send(data))
        .catch((error) => res.json(error));
}

function del(req, res) {
    const { id } = req.params;

    EmployeeService.deleteItem(id)
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
