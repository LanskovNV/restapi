const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        name: String,
        surname: String,
        birthday_date: String,
        position: String,
        salary: Number,
    },
    { versionKey: false },
);

module.exports = model('Employee', schema);
