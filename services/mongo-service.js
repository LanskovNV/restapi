const Boom = require('boom');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Employee = require('../models/employee');
const User = require('../models/user');
const { entities } = require('../utils/constants');

const models = {
    [entities.users]: User,
    [entities.employees]: Employee,
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
    }

    async getCollection(
        filters,
        pageNum,
        order = -1,
        pageSize = parseInt(process.env.PAGE_SIZE, 10),
    ) {
        const data = await this.Model.find(filters)
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .sort({ salary: order })
            .exec();

        const totalCount = await this.Model.count(filters).exec();
        return { [this.entity]: data, totalCount };
    }

    async addItem(data) {
        const model = new this.Model(data);
        return model.save();
    }

    async getItem(id) {
        return this.Model.findById(id);
    }

    async updateItem(id, data) {
        return this.Model.findByIdAndUpdate(id, data);
    }

    async deleteItem(id) {
        return this.Model.findByIdAndDelete(id);
    }

    async getItemByField(searchFields) {
        let doc;
        try {
            doc = await this.Model.findOne(searchFields).exec();
        } catch (error) {
            throw Boom.internal('db error');
        }
        if (doc === null) {
            throw Boom.notFound('no items found');
        }
        return doc;
    }
}

module.exports = {
    connectDb,
    MongoService,
};
