function specifyService(service, collection) {
    const newService = {};

    for (const [name, method] of Object.entries(service)) {
        newService[name] = (...others) => method(collection, ...others);
    }
    return newService;
}

module.exports = {
    specifyService,
}