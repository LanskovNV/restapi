const db = require('./database');

class EmployeeService {
    getById(employeeId) {
        const res = db
            .get('employees')
            .find({ id: employeeId })
            .write();
        return res;
    };

    get() {
        const res = db.get('employees').write();
        return res;
    }

    create(employeeData) {
        const res = db
            .get('employees')
            .add(employeeData)
            .write();
        return res;
    };

    delete(employeeId) {
        const res = db
            .get('employees')
            .remove({ id: employeeId })
            .write();
        return res;
    };
};

module.exports = new EmployeeService();
