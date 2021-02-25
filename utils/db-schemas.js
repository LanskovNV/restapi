const mongoose = require('mongoose');

const employeeScheme = new mongoose.Schema(
    {
        name: String,
        surname: String,
        birthday_date: String,
        position: String,
        salary: Number,
    },
    { versionKey: false },
);

const userScheme = new mongoose.Schema(
    { username: String, token: String },
    { versionKey: false },
);

const dbSchemas = {
    employee: employeeScheme,
    user: userScheme,
};

module.exports = dbSchemas;
