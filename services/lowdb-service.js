const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

async function createConnection() {
    const adapter = new FileSync('./database/db.json');
    return low(adapter);
}

async function getCollection(collection) {
    const db = await createConnection();
    return db.get(collection).write();
}

async function getItem(collection, id) {
    const db = await createConnection();
    return db.get(collection)
        .find({ id })
        .write();
}

async function updateItem(collection, id, data) {
    const db = await createConnection();
    return db
        .get(collection)
        .find({ id })
        .assign(data)
        .write();
}

async function addItem(collection, data) {
    const db = await createConnection();
    return db
        .get(collection)
        .push(data)
        .write();
}

async function deleteItem(collection, id) {
    const db = await createConnection();
    return db
        .get(collection)
        .remove({ id })
        .write();
}

module.exports = {
    getCollection,
    getItem,
    updateItem,
    addItem,
    deleteItem
};
