function specifyService(service, entity) {
  const newService = {};

  for (const [name, method] of Object.entries(service)) {
    newService[name] = (...others) => method(entity, ...others);
  }

  return newService;
}

module.exports = {
  specifyService,
};
