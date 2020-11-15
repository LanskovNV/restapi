function specifyService(service, entity) {
    const newService = {};

    for (const [name, method] of Object.entries(service)) {
        newService[name] = (...others) => method(entity, ...others);
    }

    return newService;
}

function handleRequests(requests, cb, errCb) {
    Promise.all(requests.map(request => request()))
        .then(cb)
        .catch(errCb);
}

function cmp(item, filter) {
    switch (filter.key) {
        case 'name':
        case 'surname':
        case 'position':
            if (item[filter.key].includes(filter.value)) {
                return true;
            }
            break;
        case 'salary':
            break;
    }

    return false;
}

function filterItem(filters) {
    return item => {
        const valid = []
        if (!filters.length) {
            return true;
        }
        filters.forEach(f => valid.push(cmp(item, f)))
        return !valid.includes(false);
    }
}

module.exports = {
    specifyService,
    handleRequests
};
