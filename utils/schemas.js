const baseReqSchema = (properties) => ({
    title: 'req',
    description: 'expressjs request object',
    type: 'object',
    properties,
});

const authGet = () => {
    const query = {
        description: 'query params',
        type: 'object',
        properties: {
            username: {
                type: 'string',
                minLength: 2,
                maxLength: 40,
            },
            password: {
                type: 'string',
                minLength: 8,
            },
        },
        required: ['username', 'password'],
        additionalProperties: false,
    };
    return baseReqSchema({ query });
};

const authPost = () => {
    const body = {
        description: 'body params',
        type: 'object',
        properties: {
            username: {
                type: 'string',
                minLength: 2,
                maxLength: 40,
            },
            password: {
                type: 'string',
                minLength: 8,
            },
        },
    };
    return baseReqSchema({ body });
};

const employeeGetById = () => {
    const params = {
        description: 'url params',
        type: 'object',
        properties: {
            id: {
                description: 'employee unique id',
                type: 'string',
                // pattern: '(?<=\\s|^)\\d+(?=\\s|$)',
            },
        },
        additionalProperties: false,
        required: ['id'],
    };

    return baseReqSchema({ params });
};

const employeeGet = () => {
    const query = {
        description: 'query params',
        type: 'object',
        properties: {
            filter: {
                description: 'neme or surname search',
                type: 'string',
            },
            order: {
                description: 'salary sort order',
                type: 'string',
            },
            page_num: {
                description: 'number of page to return (25 per page)',
                type: 'string',
                pattern: '(?<=\\s|^)\\d+(?=\\s|$)',
            },
        },
        additionalProperties: false,
    };
    return baseReqSchema({ query });
};

const employeePut = () => {
    const params = {
        description: 'url params',
        type: 'object',
        properties: {
            id: {
                description: 'employee unique id',
                type: 'string',
                // pattern: '(?<=\\s|^)\\d+(?=\\s|$)',
            },
        },
        additionalProperties: false,
        required: ['id'],
    };
    const body = {
        description: 'body params',
        type: 'object',
        properties: {
            name: {
                description: 'employee name',
                type: 'string',
                minLength: 2,
                maxLength: 40,
            },
            surname: {
                description: 'employee surname',
                type: 'string',
                minLength: 2,
                maxLength: 40,
            },
            birthday_date: {
                description: 'employee birthday date',
                type: 'string',
                pattern: '^\\d{1,2}.\\d{2}.\\d{4}$',
            },
            position: {
                description: 'employee current position',
                type: 'string',
                maxLength: 150,
            },
            salary: {
                description: 'employee current position',
                type: 'integer',
                // type: 'string',
                // pattern: '(?<=\\s|^)\\d+(?=\\s|$)',
            },
        },
        additionalProperties: false,
    };
    return baseReqSchema({ params, body });
};

const employeePost = () => {
    const body = {
        description: 'body params',
        type: 'object',
        properties: {
            name: {
                description: 'employee name',
                type: 'string',
                minLength: 2,
                maxLength: 40,
            },
            surname: {
                description: 'employee surname',
                type: 'string',
                minLength: 2,
                maxLength: 40,
            },
            birthday_date: {
                description: 'employee birthday date',
                type: 'string',
                pattern: '^\\d{1,2}.\\d{2}.\\d{4}$',
            },
            position: {
                description: 'employee current position',
                type: 'string',
                maxLength: 150,
            },
            salary: {
                description: 'employee current position',
                type: 'integer',
                // type: 'string',
                // pattern: '(?<=\\s|^)\\d+(?=\\s|$)',
            },
        },
        additionalProperties: false,
        required: ['name', 'surname', 'birthday_date', 'position', 'salary'],
    };
    return baseReqSchema({ body });
};

module.exports = {
    employeeSchemas: {
        getById: employeeGetById(),
        delete: employeeGetById(),
        get: employeeGet(),
        put: employeePut(),
        post: employeePost(),
    },
    authSchemas: {
        post: authPost(),
        get: authGet(),
    },
};
