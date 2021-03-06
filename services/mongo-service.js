const Boom = require('boom');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Employee = require('../models/employee');
const User = require('../models/user');
const { employeeMsg, authMsg } = require('../utils/messages');
const { entities } = require('../utils/constants');

const models = {
    [entities.users]: User,
    [entities.employees]: Employee,
};

const messages = {
    [entities.users]: authMsg,
    [entities.employees]: employeeMsg,
};

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

class MongoService {
    constructor(entity) {
        this.entity = entity;
        this.Model = models[entity];
        this.msg = messages[entity];
    }

    async _handleQuery(q) {
        let doc;
        try {
            doc = await q.exec();
        } catch (error) {
            throw Boom.internal('db error');
        }
        if (doc === null) {
            throw Boom.notFound(this.msg.NOT_FOUND);
        }
        return doc;
    }

    async getCollection(
        filter,
        pageNum,
        order = -1,
        pageSize = parseInt(process.env.PAGE_SIZE, 10),
    ) {
        const search = {
            $or: [
                { name: { $regex: filter, $options: 'i' } },
                { surname: { $regex: filter, $options: 'i' } },
            ],
        };
        try {
            const data = await this.Model.find(search)
                .skip((pageNum - 1) * pageSize)
                .limit(pageSize)
                .sort({ salary: order })
                .exec();

            const totalCount = await this.Model.countDocuments(search).exec();
            return { [this.entity]: data, totalCount };
        } catch (error) {
            throw Boom.internal('db error');
        }
    }

    async addItem(data) {
        let doc;
        try {
            const model = new this.Model(data);
            doc = await model.save();
        } catch (error) {
            throw Boom.internal('db error');
        }
        if (doc === null) {
            throw Boom.notFound('cannot save item');
        }
        return doc;
    }

    async getItem(id) {
        const query = this.Model.findById(id);
        return this._handleQuery(query);
    }

    async updateItem(id, data) {
        const query = this.Model.findByIdAndUpdate(id, data);
        return this._handleQuery(query);
    }

    async deleteItem(id) {
        const query = this.Model.findByIdAndDelete(id);
        return this._handleQuery(query);
    }

    async getItemByField(searchFields) {
        const query = this.Model.findOne(searchFields);
        return this._handleQuery(query);
    }
}

module.exports = {
    connectDb,
    MongoService,
};
