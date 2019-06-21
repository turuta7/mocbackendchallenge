const Router = require('koa-router');

const bcrypt = require('bcrypt');

const router = new Router();

const User = require('../../models').user;

const { saltRounds } = process.env;

router.post('/login', async (ctx, next) => {
    const { header } = ctx.request;
    try {
        if (!header) {
            ctx.status = 500;
            ctx.body = { message: 'error header' };
            return;
        }
        if (!header.user_name || !header.password) {
            ctx.status = 500
            ctx.body = { message: 'error' };
            return;
        }
        const user = await User.findOne({
            where: { user_name: header.user_name },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (user === null) {
            const hash = bcrypt.hashSync(header.password, Number(saltRounds));
            await User.create({
                user_name: header.user_name,
                credentials: hash
            })
            const userTestDB = await User.findOne({
                where: { user_name: header.user_name },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            ctx.status = 200;
            ctx.body = await userTestDB.dataValues
            next()
            return
        }

        if (bcrypt.compareSync(header.password, user.dataValues.credentials) === true) {
            ctx.status = 200;
            ctx.body = { user: user.dataValues }
            await next()
        } else {
            ctx.status = 500;
            ctx.body = { message: 'error password' }
            await next()
        }

    } catch (error) {
        console.log('error');
        ctx.status = 500;
        ctx.body = { message: 'error' };
    }

});

module.exports = router;