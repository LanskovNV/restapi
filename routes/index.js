const express = require('express');
const router = express.Router();
const employeeRoutes = require('./employee.routes');

router.use('/employee', employeeRoutes);

module.exports = router;
