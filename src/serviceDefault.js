const { ServiceInterface } = require('./interfaces/service');

class DefaultService extends ServiceInterface {
  constructor () {
    super();
    this.name = 'default:default';
  }

  getMatchingUrls () {
    return ['/*'];
  }
}

module.exports = { DefaultService };
