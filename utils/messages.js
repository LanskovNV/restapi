const employeeMsg = {
    NOT_FOUND: `Employee not found`,
    NO_COLLECTION: 'Employees collection not found in database',
    DB_ID_ERR: 'Can not get new user id from db',
};

const authMsg = {
    NOT_FOUND: 'Login or password is incorrect, please try again',
    INVALID_TOKEN: 'Token is invalid, get new one',
};

const routerMsg = {
    BAD_REQ: 'Invalid request',
};

const validatorMsg = {
    BAD_PARAMS: 'Error: request parameters validation failed',
};

module.exports = {
    employeeMsg,
    routerMsg,
    validatorMsg,
    authMsg,
};
