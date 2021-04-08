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
    const filters = { name: req.query.name, surname: req.query.surname };
    // const { order } = req.query.order;

    EmployeeService.getCollection(filters, req.query.page_num || 1)
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
