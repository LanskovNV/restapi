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

async function getCollection(entity, collection, filters, page_num) {
    const db = await createConnection(entity);
    const page_size = 5;
    const start = (page_num - 1) * page_size;
    const end = start + page_size;
    return db
        .get(collection)
        .filter(filters)
        .sortBy('salary')
        .slice(start, end)
        .write();
}

async function getItem(entity, collection, id, errorMsg) {
    const db = await createConnection(entity);
    const item = db.get(collection)
        .find(id)
        .write();
    if (!item) {
        throw Boom.notFound(errorMsg);
    }
    return item;
}

async function updateItem(entity, collection, id, data) {
    const db = await createConnection(entity);
    return db
        .get(collection)
        .find({ id })
        .assign(data)
        .write();
}

async function addItem(entity, collection, data) {
    const { last_id } = await getNewId();
    const db = await createConnection(entity);

    return db
        .get(collection)
        .push({id: last_id, ...data})
        .write();
}

async function deleteItem(entity, collection, id) {
    const db = await createConnection(entity);
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
