const Router = require('koa-router');

const router = new Router();

const User = require('../../models').user;

router.get('/users', async (ctx, next) => {
    const users = await User.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    const usersAll = users.map(x => x.dataValues);
    ctx.status = 200;
    ctx.body = { message: usersAll }
    next()
})
module.exports = router;