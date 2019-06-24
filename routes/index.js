const combineRouters = require('koa-combine-routers');

// routes
const test = require('./rout/test');
const login = require('./rout/login');
const users = require('./rout/users')
const usersId = require('./rout/usersId')
const rooms = require('./rout/rooms');
const deletRooms = require('./rout/deletRooms')

const router = combineRouters(
    test,
    login,
    users,
    usersId,
    rooms,
    deletRooms
);

module.exports = router;
