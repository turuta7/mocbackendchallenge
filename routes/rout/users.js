const Router = require('koa-router');

const router = new Router();

const User = require('../../models').user;

router.get('/users', async (ctx, next) => {
    const { header } = ctx.request;

    let auth = '';
    if (!header.authorization) {
        ctx.status = 500;
        ctx.body = { message: 'error Authorization' }
        return;
    }
    auth = header.authorization
    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const userTestDB = await User.findOne({
        where: { user_name: credentials.split(':')[0] },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (userTestDB === null) {
        ctx.status = 500;
        ctx.body = { message: 'error user' }
        return
    }
    const users = await User.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    const usersAll = users.map(x => x.dataValues);
    ctx.status = 200;
    ctx.body = { message: usersAll }
    next()
})
module.exports = router;