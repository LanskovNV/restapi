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
        "description": "url params",
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
const employeePut = () => {
    const params = {
        "description": "url params",
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
    const body = {
        "description": "url params",
        "type": "object",
        "properties": {
            "name": {
                "description": "employee name",
                "type": "string",
                "minLength": 2,
                "maxLength": 40,
            },
            "surname": {
                "description": "employee surname",
                "type": "string",
                "minLength": 2,
                "maxLength": 40,
            },
            "birthday_date": {
                "description": "employee birthday date",
                "type": "string",
                "pattern": "^\\d{1,2}.\\d{2}.\\d{4}$",
            },
            "position": {
                "description": "employee current position",
                "type": "string",
                "maxLength": 150
            },
            "salary": {
                "description": "employee current position",
                "type": "integer",
                "minimum": 1,
                "maximum": 10000
            }
        }
    };
    return baseReqSchema(params, {}, body);
};
const employeePost = () => {
    const body = {
        "description": "url params",
        "type": "object",
        "properties": {
            "name": {
                "description": "employee name",
                "type": "string",
                "minLength": 2,
                "maxLength": 40,
            },
            "surname": {
                "description": "employee surname",
                "type": "string",
                "minLength": 2,
                "maxLength": 40,
            },
            "birthday_date": {
                "description": "employee birthday date",
                "type": "string",
                "pattern": "^\\d{1,2}.\\d{2}.\\d{4}$",
            },
            "position": {
                "description": "employee current position",
                "type": "string",
                "maxLength": 150
            },
            "salary": {
                "description": "employee current position",
                "type": "string",
                "pattern": "(?<=\\s|^)\\d+(?=\\s|$)"
            }
        },
        "required": ["name", "surname", "birthday_date", "position", "salary"]
    };
    return baseReqSchema({}, {}, body);
};

module.exports = {
    employeeSchemas : {
        getById: employeeGetById(),
        delete: employeeGetById(),
        get: employeeGet(),
        put: employeePut(),
        post: employeePost()
    }
}
