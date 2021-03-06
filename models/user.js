const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        username: String,
        token: String,
    },
    { versionKey: false },
);

module.exports = model('User', schema);
