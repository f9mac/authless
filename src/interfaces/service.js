const { SpawnSet } = require('../spawnSet');
const { AccountInterface } = require('./account');
const { RouteInterface } = require('./route');
const delay = require('delay');

class ServiceInterface extends SpawnSet {
  constructor() {
    super();
  }

  static getRoutes (service, Route) {
    if (!(Route.prototype instanceof RouteInterface)) {
      throw new Error('Expected `Route` to inherit from RouteInterface');
    }

    return service.getMatchingUrls().map(url => {
      return new Route('GET', url, service);
    })
  }

  add (account) {
    if (!(account instanceof AccountInterface)) {
      throw new Error('Expected `account` to be instance of Account');
    }
    account.service = this;
    super.add(account);
    return this;
  }

  spawnAccount () {
    const account = this.spawn();
    if (!(account instanceof AccountInterface)) {
      throw new Error('Expected the spawned `account` to be instance of Account. Weird!');
    }
    return account;
  }

  async hasCookies (page) {
    const cookies = await page.cookies(this.serviceDomain || '.');
    return cookies.length >= 1
  }

  async isAuthenticated (page) {
    const getCookieUrls = () => {
      return this.getMatchingUrls().
        map(url => url.replace('*', '')).
        map(url => [`http:/${url}`, `https:/${url}`]).
        reduce((a, b) => a.concat(b), []);
    }
    const cookies = await page.cookies(...getCookieUrls() || '.');
    return cookies.length >= 1
  }

  async authenticate (page, account) {
    const loginUrl = 'https://www.linkedin.com/uas/login?trk=guest_homepage-basic_nav-header-signin';
    await page.goto(loginUrl, {waitUntil: 'networkidle2'});
    await page.click('#username', {clickCount: 3});
    await page.keyboard.type(account.username, {delay: 20});
    await page.click('#password', {clickCount: 3});
    await page.keyboard.type(account.password, {delay: 20});
    await page.click('button[type=submit]', {waitUntil: 'networkidle2'});
    await delay(3500);
    return page.url().includes('feed');
  }
}

module.exports = { ServiceInterface }
