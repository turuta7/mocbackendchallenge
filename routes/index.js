const combineRouters = require('koa-combine-routers');

// routes
const test = require('./rout/test');

const router = combineRouters(
    test
);

module.exports = router;
