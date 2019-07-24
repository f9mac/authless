const { ServiceInterface } = require('./interfaces/service');

class LinkedinSalesNavigatorService extends ServiceInterface {
  constructor () {
    super();
    this.name = 'linkedin:sales_navigator';
  }

  getMatchingUrls () {
    return [
      '/linkedin.com/sales/*',
      '/www.linkedin.com/sales/*',
    ];
  }
}

module.exports = { LinkedinSalesNavigatorService };
