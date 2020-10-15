const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');
const EmployeeService = require('../services/employee.service');

router.use(async (req, resp, next) => {
    const data = await EmployeeService.getAllEmployees();

    if (data) {
        req.employees = data;
        next();
    } else {
        return resp.status(500).send({ message: 'Error while getting employees from database' });
    }
});

router
    .route('/:id')
    .get(EmployeeController.getEmployee)
    .delete(EmployeeController.deleteEmployee);
router.get('/all', EmployeeController.getAllEmployees);
router.post('/create', EmployeeController.createEmployee);

module.exports = router;
