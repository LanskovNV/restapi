const EmployeeService = require('../services/employeeService');


class EmployeeController {
    get(req, resp) {
        if (req.params.id) {
            const employeeId = Number.parseInt(req.params.id, 10);
            if (!employeeId) {
                return resp.status(500).send({ message: `Employee id should be a integer! given: ${req.params.id}` });
            }

            const employee = EmployeeService.getById(employeeId);
            if (employee) {
                return resp.status(200).send({ data: employee });
            }

            return resp.status(500).send({ message: `Employee with id=${employeeId} not found` });
        }

        const employees = EmployeeService.get();
        if (employees) {
            return resp.status(200).send({ data: employees });
        }

        return resp.status(500).send({ message: 'Employees not found in database' });
    }

    post(req, resp) {
        return resp.status(500).send({ message: 'Not implemented' });
    }

    delete(req, resp) {
        return resp.status(500).send({ message: 'Not implemented' });
    }
}

module.exports = new EmployeeController();
