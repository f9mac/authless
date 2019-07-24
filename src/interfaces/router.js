const FindMyWay = require('find-my-way');
const { RouteInterface } = require('./route');

class RouterInterface extends FindMyWay {
  constructor (routes) {
    super();
    if (!(routes instanceof Array)) throw new Error('`routes` must be an Array');
    if (routes.length === 0) throw new Error('`routes` must not be empty');
    if (!routes.every(element => element instanceof RouteInterface)) {
      throw new Error('`routes` elements must be instances of Route');
    }

    this.serviceMap = new Map();
    routes.forEach(route => {
      this.serviceMap.set(route.service.name, route.service);
       // register the routes
      this.on(route.method, route.path, () => route.service);
    });
  }
}

module.exports = { RouterInterface };
