const Ajv = require('ajv');
const Boom = require('boom');
const { validatorMsg } = require('../utils/messages');

const ajv = new Ajv();

function getValidator(schema) {
    const validate = ajv.compile(schema);

    return (req, res, next) => {
        const valid = validate(req);
        if (!valid) {
            next(Boom.badRequest(validatorMsg.BAD_PARAMS + validate.errors));
        }

        next();
    };
}

module.exports = getValidator;
