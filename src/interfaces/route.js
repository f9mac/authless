class RouteInterface {
  constructor (method, path, service) {
    this.method = method;
    this.path = path;
    this.service = service;
  }
}

module.exports = { RouteInterface };
