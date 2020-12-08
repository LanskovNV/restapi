const low = require('lowdb');
const { v4: uuid } = require('uuid');
const FileAsync = require('lowdb/adapters/FileAsync');
const Boom = require('boom');

async function createConnection(entity) {
  const adapter = new FileAsync(`./database/${entity}.json`);
  return low(adapter);
}

async function getCollection(entity, filters, pageNum) {
  const db = await createConnection(entity);
  const pageSize = 5;
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;
  return db
    .get(entity)
    .filter(filters)
    .sortBy('salary')
    .slice(start, end)
    .write();
}

async function getItem(entity, id, errorMsg) {
  const db = await createConnection(entity);
  const item = db.get(entity).find(id).write();
  if (!item) {
    throw Boom.notFound(errorMsg);
  }

  return item;
}

async function updateItem(entity, id, data) {
  const db = await createConnection(entity);
  return db.get(entity).find(id).assign(data).write();
}

async function addItem(entity, data) {
  const id = await uuid();
  const db = await createConnection(entity);

  return db
    .get(entity)
    .push({ id, ...data })
    .write();
}

async function deleteItem(entity, id) {
  const db = await createConnection(entity);
  return db.get(entity).remove(id).write();
}

module.exports = {
  getCollection,
  getItem,
  updateItem,
  addItem,
  deleteItem,
};
