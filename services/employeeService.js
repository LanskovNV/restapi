const db = require('./database');

class EmployeeService {
    get() {
        return db.get('employees');
    };

    create(employeeData) {
        return db
            .get('employees')
            .add(employeeData)
            .write();
    };

    delete(employeeId) {
        return db
            .get('employees')
            .remove({ id: employeeId })
            .write();
    };
};

module.exports = new EmployeeService();
