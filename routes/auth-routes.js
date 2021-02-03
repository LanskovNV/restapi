const express = require('express');
const getValidator = require('../middlewares/validator');
const AuthController = require('../controllers/auth-controller');
const { authSchemas } = require('../utils/schemas');

const router = express.Router();

router
    .route('/')
    .post(getValidator(authSchemas.post), AuthController.create)
    .get(getValidator(authSchemas.get), AuthController.get);

module.exports = router;
