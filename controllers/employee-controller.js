const StatusCodes = require('http-status-codes');
const { entities } = require('../utils/constants');
const { MongoService } = require('../services/mongo-service');

const EmployeeService = new MongoService(entities.employees);

async function handleRequest(request, res, next) {
    try {
        const data = await request();
        res.status(StatusCodes.OK).send(data);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    const { id } = req.params;
    const request = async () => EmployeeService.getItem(id);
    return handleRequest(request, res, next);
}

async function get(req, res, next) {
    const filters = { ...req.query };
    delete filters.page_num;
    delete filters.order;
    const order = req.query.order ? Number.parseInt(req.query.order, 10) : -1;

    const request = async () =>
        EmployeeService.getCollection(filters, req.query.page_num || 1, order);
    return handleRequest(request, res, next);
}

async function create(req, res, next) {
    const request = async () => EmployeeService.addItem(req.body);
    return handleRequest(request, res, next);
}

async function update(req, res, next) {
    const { id } = req.params;
    const request = async () => EmployeeService.updateItem(id, req.body);
    return handleRequest(request, res, next);
}

async function del(req, res, next) {
    const { id } = req.params;
    const request = async () => EmployeeService.deleteItem(id);
    return handleRequest(request, res, next);
}

module.exports = {
    getById,
    get,
    update,
    create,
    del,
};
