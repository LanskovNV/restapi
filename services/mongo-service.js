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
        this.Model = models[entity];
    }

    async getCollection(
        filters,
        pageNum,
        pageSize = parseInt(process.env.PAGE_SIZE, 10),
    ) {
        return this.Model.find(filters)
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .sort({ salary: -1 });
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
        return this.Model.findOne(searchFields);
    }
}

module.exports = {
    connectDb,
    MongoService,
};
