const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');


router
    .route('/:id')
    .get(EmployeeController.getEmployee)
    .delete(EmployeeController.deleteEmployee);
router.get('/all', EmployeeController.getEmployees);
router.post('/create', EmployeeController.postEmployee);

module.exports = router;
