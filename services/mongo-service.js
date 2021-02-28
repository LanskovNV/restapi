const mongoose = require('mongoose');
const bluebird = require('bluebird');
const dbSchemas = require('../utils/db-schemas');

function connectDb() {
    mongoose.Promise = bluebird;

    const dbUrl = process.env.DB_URL;
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    };
    mongoose.connect(dbUrl, options);
    return mongoose.connection;
}

async function getCollection(entity, filters, pageNum) {
    const Model = mongoose.model(entity, dbSchemas[entity]);

    const data = Model.find(filters).sort({ salary: -1 });

    console.log(data);
}
async function getItem(entity, id, errorMsg) {}
async function updateItem(entity, id, data) {}
async function addItem(entity, data) {}
async function deleteItem(entity, id) {}

module.exports = {
    connectDb,
    getCollection,
    getItem,
    updateItem,
    addItem,
    deleteItem,
};
