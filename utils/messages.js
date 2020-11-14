const employeeMsg = {
    BAD_ID: id => `Employee id should be a integer! given: ${id}`,
    NOT_FOUND: id => `Employee with id=${id} not found`,
    NO_COLLECTION: 'Employees collection not found in database'
};

const routerMsg = {
    BAD_REQ: 'Invalid request'
};

const validatorMsg = {
    BAD_PARAMS: 'Error: request parameters validation failed'
};

module.exports = {
    employeeMsg,
    routerMsg,
    validatorMsg
};
