const express = require('express');
const router = express.Router();
const employeeRoutes = require('./employeeRoutes');

router.use('/employee', employeeRoutes);

module.exports = router;
