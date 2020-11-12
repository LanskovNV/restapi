const StatusCodes = require('http-status-codes');
const { employeeCollection } = require('../utils/constants');
const { specifyService } = require('../utils/utils');
const Service = specifyService(require('../services/lowdb-service'), employeeCollection);

function getById(req, res) {
    const employeeId = Number.parseInt(req.params.id, 10);
    if (!employeeId && employeeId !== 0) {
        return res.status(400).send({ message: `Employee id should be a integer! given: '${req.params.id}'` });
    }

    Service.getItem(employeeId)
        .then(employee =>
            res.status(StatusCodes.OK).send({ data: employee }))
        .catch(() =>
            res.status(StatusCodes.NOT_FOUND).send({ message: `Employee with id=${employeeId} not found` }));
}

function get(req, res) {
    Service.getCollection()
        .then(data =>
            res.status(StatusCodes.OK).send({ data }))
        .catch(() =>
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Employees not found in database' }));
}

function create(req, res) {
    Service.addItem(req.body)
        .then(() =>
            res.status(StatusCodes.OK).send({ message: 'New employee created sucessfully' }))
        .catch(error =>
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error }));

}

function update(req, res) {
    const employeeId = Number.parseInt(req.params.id, 10);
    Service.updateItem(employeeId, req.body)
        .then(() =>
            res.status(StatusCodes.OK).send({ message: 'employee updated sucessfully' }))
        .catch(error =>
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error }));
}

function del(req, res) {
    const employeeId = Number.parseInt(req.params.id, 10);
    if (!employeeId && employeeId !== 0) {
        return res.status(500).send({ message: `Employee id should be a integer! given: '${req.params.id}'` });
    }

    Service.deleteItem(employeeId)
        .then(data =>
            res.status(StatusCodes.OK).send({ data }))
        .catch(() =>
            res.status(StatusCodes.NOT_FOUND).send({ message: `Employee with id=${employeeId} not in database` }));
}


module.exports = {
    getById,
    get,
    update,
    create,
    del,
}
