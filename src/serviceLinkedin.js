const { ServiceInterface } = require('./interfaces/service');

class LinkedinService extends ServiceInterface {
  constructor () {
    super();
    this.name = 'linkedin:default';
    this.serviceDomain = 'http://www.linkedin.com';
  }

  getMatchingUrls () {
    return [
      '/linkedin.com/*',
      '/linkedin.com',
      '/www.linkedin.com/*',
      '/www.linkedin.com'
    ];
  }
}

module.exports = { LinkedinService };
