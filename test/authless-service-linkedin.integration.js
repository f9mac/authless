/* eslint-env node, mocha */
const assert = require('assert');
const assertThrows = require('assert-throws-async');
const config = require('../config.js');
const delay = require('delay');
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

  it('initializes', () => {
    new Authless(testRouter);
  });

  describe('.isAuthenticated', () => {
    context('is authenticated', () => {
      before(async () => {
        const authless = new Authless(testRouter);
        const account = authless.findAccountByUrl('https://linkedin.com');
        return authless.useBrowserWithAccount(account, async browser => {
          //const page = await browser.newPage();
          //return account.authenticate(page);
        });
      });

      it('returns true', async () => {
        const authless = new Authless(testRouter);
        const account = authless.findAccountByUrl('https://linkedin.com');
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
