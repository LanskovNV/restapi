const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee-controller');

router
    .route('/:id')
    .get(EmployeeController.getById)
    .put(EmployeeController.update)
    .delete(EmployeeController.del)

router
    .route('/')
    .get(EmployeeController.get)
    .post(EmployeeController.create);

module.exports = router;
