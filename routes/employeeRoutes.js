const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');


router
    .route('/person/:id')
    .get(EmployeeController.get)
    .delete(EmployeeController.delete);
router.get('/all', EmployeeController.get);
router.post('/create', EmployeeController.post);

module.exports = router;
