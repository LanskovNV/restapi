const express = require('express');
const Boom = require('boom');
const { routerMsg } = require('../utils/messages');
const employeeRoutes = require('./employee-routes');

const router = express.Router();

router.use('/employees', employeeRoutes);
router.all('*', (req, res) => {
    res.json(Boom.notFound(routerMsg.BAD_REQ));
});

module.exports = router;
