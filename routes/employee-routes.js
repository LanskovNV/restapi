const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee-controller');


router
    .route('/:id')
    .get(EmployeeController.getById)
    .put(EmployeeController.update)
    .delete(EmployeeController.delete)
    

router
    .route('/')
    .get(EmployeeController.get)
    .post(EmployeeController.create);


module.exports = router;
