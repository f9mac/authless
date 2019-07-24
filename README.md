# Authless • [![Maintainability](https://api.codeclimate.com/v1/badges/0d08b1e07557c386f3ec/maintainability)](https://codeclimate.com/github/f9mac/authless/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0d08b1e07557c386f3ec/test_coverage)](https://codeclimate.com/github/f9mac/authless/test_coverage)

A browserless, "Chrome-as-a-service", extension adding advanced authentication management capabilities.

## Install

```
yarn add authless
# - or -
npm install authless
```

## ENV

- **`CHROME_USER_DATA_DIR`**: If set user data profiles are stored in that directory, otherwise chrome default dir is used. Example: `/path/to/dir/`. Default: `undefined`

## Usage

```javascript
const {
  Authless,
  Router,
  Route,
  DefaultService,
  LinkedinService,
  LinkedinSalesNavigatorService,
  Account
} = require('authless');

// initate services
const defaultService = new DefaultService();
const linkedinService = new LinkedinService();
const linkedinSalesNavService = new LinkedinSalesNavigatorService();

// add accounts to services (or do it sometime later)
defaultService.add(new Account(config));

// initiate router with services
const authlessRouter = new Router([
  ...DefaultService.getRoutes(defaultService, Route),
  ...LinkedinService.getRoutes(linkedinService, Route),
  ...LinkedinSalesNavigatorService.getRoutes(linkedinSalesNavService, Route)
]);

// and finally, initiate authless
const authless = new Authless(authlessRouter);
```

## ToDo

- [ ] implement post .goto verification if authenticated or not
