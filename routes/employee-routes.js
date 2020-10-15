const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee-controller');


router
    .route('/:employeeId')
    .get(EmployeeController.getById)
    // .put(EmployeeController.update)
    .delete(EmployeeController.delete)
    

router
    .route('/')
    .get(EmployeeController.getById)
    .post(EmployeeController.post);


module.exports = router;
