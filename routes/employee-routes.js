const express = require('express');
const EmployeeController = require('../controllers/employee-controller');
const getValidator = require('../middlewares/validator');
const { employeeSchemas } = require('../utils/schemas');

const router = express.Router();

router
    .route('/:id')
    .get(getValidator(employeeSchemas.getById), EmployeeController.getById)
    .put(EmployeeController.update)
    .delete(EmployeeController.del);

router
    .route('/')
    .get(EmployeeController.get)
    .post(EmployeeController.create);

module.exports = router;
