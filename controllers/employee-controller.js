const EmployeeService = require('../services/employee-service');


class EmployeeController {
    getById(req, resp) {
        const employeeId = Number.parseInt(req.params.id, 10);
        if (!employeeId && employeeId !== 0) {
            return resp.status(400).send({ message: `Employee id should be a integer! given: '${req.params.id}'` });
        }

        const employee = EmployeeService.getById(employeeId);
        if (employee) {
            return resp.status(200).send({ data: employee });
        }

        return resp.status(404).send({ message: `Employee with id=${employeeId} not found` });
    }
    
    get(req, resp) {
        const employees = EmployeeService.get();
        
        if (employees) {
            return resp.status(200).send({ data: employees });
        }

        return resp.status(404).send({ message: 'Employees not found in database' });
    }

    post(req, resp) {
        console.log(req.query);
        return resp.status(500).send({ message: 'Not implemented' });
    }

    delete(req, resp) {
        const employeeId = Number.parseInt(req.params.id, 10);
        if (!employeeId && employeeId !== 0) {
            return resp.status(500).send({ message: `Employee id should be a integer! given: '${req.params.id}'` });
        }

        const employee = EmployeeService.delete(employeeId);
        if (employee) {
            return resp.status(200).send({ data: employee });
        }

        return resp.status(404).send({ message: `Employee with id=${employeeId} not in database` });
    }
}

module.exports = new EmployeeController();
