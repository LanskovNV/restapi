const express = require('express');
const EmployeeController = require('../controllers/employee-controller');
const getValidator = require('../middlewares/validator');
const { employeeSchemas } = require('../utils/schemas');

const router = express.Router();

router
    .route('/:id')
    .get(getValidator(employeeSchemas.getById), EmployeeController.getById)
    .put(getValidator(employeeSchemas.put), EmployeeController.update)
    .delete(getValidator(employeeSchemas.delete), EmployeeController.del);

router
    .route('/')
    .get(getValidator(employeeSchemas.get), EmployeeController.get)
    .post(getValidator(employeeSchemas.post), EmployeeController.create);

module.exports = router;
