const EmployeeService = require('../services/employeeService')


class EmployeeController {
    get(req, resp) {
        if (req.params.id) {
            const employee = EmployeeService.get(req.params.id);
            if (employee) {
                return resp.status(200).send({ data: employee });
            } else {
                return resp.status(500).send({ message: `Employee with id=${req.params.id} not found` });
            }
        } else {
            const employees = EmployeeService.get(req.params.id);
            if (employees) {
                return resp.status(200).send({ data: employees });
            } else {
                return resp.status(500).send({ message: `Employees not found in database` });
            }
        }
    };

    post(req, resp) {
        return resp.status(500).send({ message: 'Not implemented' });
    };

    delete(req, resp) {
        return resp.status(500).send({ message: 'Not implemented' });
    };
};

module.exports = new EmployeeController();
