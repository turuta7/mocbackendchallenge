const combineRouters = require('koa-combine-routers');

// routes
const test = require('./rout/test');
const login = require('./rout/login');
const users = require('./rout/users')
const usersId = require('./rout/usersId')

const router = combineRouters(
    test,
    login,
    users,
    usersId
);

module.exports = router;
