const express = require('express');
const Boom = require('boom');
const { routerMsg } = require('../utils/messages');
const employeeRoutes = require('./employee-routes');
const authRoutes = require('./auth-routes');
const swaggerRoutes = require('./swagger');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/swagger', swaggerRoutes);
router.all('*', (req, res) => {
    res.json(Boom.notFound(routerMsg.BAD_REQ));
});

module.exports = router;
