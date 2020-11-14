const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Boom = require('boom');

async function getNewId() {
    const db = await createConnection('meta');
    return db.update('last_id', n => n + 1).write();
}

async function createConnection(entity) {
    const adapter = new FileSync(`./database/${entity}.json`);
    return low(adapter);
}

async function getCollection(collection) {
    const db = await createConnection('employees');
    return db.get(collection).write();
}

async function getItem(collection, id, errorMsg) {
    const db = await createConnection('employees');
    const item = db.get(collection)
        .find({ id })
        .write();
    if (!item) {
        throw Boom.notFound(errorMsg);
    }
    return item;
}

async function updateItem(collection, id, data) {
    const db = await createConnection('employees');
    return db
        .get(collection)
        .find({ id })
        .assign(data)
        .write();
}

async function addItem(collection, data) {
    const { last_id } = await getNewId();
    const db = await createConnection('employees');

    return db
        .get(collection)
        .push({id: last_id, ...data})
        .write();
}

async function deleteItem(collection, id) {
    const db = await createConnection('employees');
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
