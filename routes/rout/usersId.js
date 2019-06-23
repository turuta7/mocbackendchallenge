const Router = require('koa-router');

const router = new Router();

const User = require('../../models').user;

router.get('/users/:id', async (ctx, next) => {
    try {
        const { id } = ctx.params
        if (!Number(id)) {
            ctx.status = 500;
            ctx.body = { message: 'error ID user' }
            return
        }
        const users = await User.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (users === null) {
            ctx.status = 500;
            ctx.body = { message: 'not user DB' }
            return;
        }
        ctx.status = 200;
        ctx.body = { users }
        next()
    } catch (error) {
        console.error(error)
    }
})
module.exports = router;