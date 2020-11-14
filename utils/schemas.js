const baseReqSchema = (params={}, query={}, body={}, headers={}) => ({
    "title": "req",
    "description": "expressjs request object",
    "type": "object",
    "properties": {
        params,
        query,
        body,
        headers
    }
});

const employeeGetById = () => {
    const params = {
        "type": "object",
        "properties": {
            "id": {
                "description": "employee unique id",
                "type": "string",
                "pattern": "(?<=\\s|^)\\d+(?=\\s|$)"
            }
        },
        "required": ["id"]
    };

    return baseReqSchema(params);
};

const employeeGet = () => baseReqSchema();
const employeePut = () => baseReqSchema();
const employeePost = () => baseReqSchema();

module.exports = {
    employeeSchemas : {
        getById: employeeGetById(),
        delete: employeeGetById(),
        get: employeeGet(),
        put: employeePut(),
        post: employeePost()
    }
}
