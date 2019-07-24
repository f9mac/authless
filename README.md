# Authless

A browserless, "Chrome-as-a-service", extension adding advanced authentication management capabilities.

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
