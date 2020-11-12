const StatusCodes = require('http-status-codes');
const EmployeeService = require('../services/employee-service');


class EmployeeController {
    getById(req, res) {
        const employeeId = Number.parseInt(req.params.id, 10);
        if (!employeeId && employeeId !== 0) {
            return res.status(400).send({ message: `Employee id should be a integer! given: '${req.params.id}'` });
        }

        const employee = EmployeeService.getById(employeeId);
        if (employee) {
            return res.status(200).send({ data: employee });
        }

        return res.status(404).send({ message: `Employee with id=${employeeId} not found` });
    }
    
    get(req, res) {
        const employees = EmployeeService.get();
        
        if (employees) {
            return res.status(200).send({ data: employees });
        }

        return res.status(404).send({ message: 'Employees not found in database' });
    }

    create(req, res) {
        EmployeeService.create(req.body);
        return res.status(StatusCodes.OK).send({ message: 'New employee created sucessfully' });
    }

    update(req, res) {
        const employeeId = Number.parseInt(req.params.id, 10);
        EmployeeService.update(employeeId, req.body);
        return res.status(StatusCodes.OK).send({ message: 'employee updated sucessfully' });
    }

    delete(req, res) {
        const employeeId = Number.parseInt(req.params.id, 10);
        if (!employeeId && employeeId !== 0) {
            return res.status(500).send({ message: `Employee id should be a integer! given: '${req.params.id}'` });
        }

        const employee = EmployeeService.delete(employeeId);
        if (employee) {
            return res.status(200).send({ data: employee });
        }

        return res.status(404).send({ message: `Employee with id=${employeeId} not in database` });
    }
}

module.exports = new EmployeeController();
