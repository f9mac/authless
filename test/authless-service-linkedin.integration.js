/* eslint-env node, mocha */
const assert = require('assert');
const config = require('../config.js');
const {
  Authless,
  Router,
  Route,
  LinkedinService,
  Account,
} = require('../src');

const configObj = {
  username: config.get('username'),
  password: config.get('password')
}

describe('Authless:Service:Linkedin', () => {
  let testRouter;
  beforeEach(() => {
    const linkedinService = new LinkedinService();
    linkedinService.add(new Account(configObj));
    testRouter = new Router([...LinkedinService.getRoutes(linkedinService, Route)]);
  });

  describe('.isAuthenticated', () => {
    context('is authenticated', () => {
      it('returns true', async () => {
        const authless = new Authless(testRouter);
        const account = authless.findAccountByUrl('https://linkedin.com');
        await authless.useBrowserWithAccount(account, async browser => {
          // set cookies
          const page = await browser.newPage();
          return page.setCookie({
            name: 'test',
            value: '123',
            url: 'https://linkedin.com',
            // make that cookie expire in 25 years
            expires: Date.now() + 3600 * 60 * 24 * 365 * 25
          });
        });
        const isAuthenticated = await authless.useBrowserWithAccount(account, async browser => {
          const page = await browser.newPage();
          return account.isAuthenticated(page);
        });
        assert.equal(isAuthenticated, true);
      })
    })

    context('is not authenticated', () => {
      it('returns false', async () => {
        const authless = new Authless(testRouter);
        const account = authless.findAccountByUrl('https://linkedin.com');
        const isAuthenticated = await authless.useBrowserWithAccount({account, virginProfile: true}, async browser => {
          const page = await browser.newPage();
          return account.isAuthenticated(page);
        });
        assert.equal(isAuthenticated, false);
      })
    })
  });
});
