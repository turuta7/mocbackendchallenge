const Router = require('koa-router');


const router = new Router();

const User = require('../../models').user;

router.post('/login', async (ctx, next) => {
    const { header } = ctx.request;
    try {
        if (!ctx.request.body) {
            ctx.status = 500;
            ctx.body = { message: 'error header' };
            return;
        }
        if (!ctx.request.body.user_name || !ctx.request.body.password) {
            ctx.status = 500
            ctx.body = { message: 'error' };
            return;
        }

        const user = await User.findOne({
            where: { user_name: ctx.request.body.user_name },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (user === null) {
            const auth = `Basic ${Buffer.from(`${ctx.request.body.user_name}:${ctx.request.body.password}`).toString('base64')}`;

            await User.create({
                user_name: ctx.request.body.user_name,
                credentials: auth
            })
            const userTestDB = await User.findOne({
                where: { user_name: ctx.request.body.user_name },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            ctx.status = 200;
            ctx.body = await userTestDB.dataValues
            next()
            return
        };
        let auth = '';

        if (!header.Authorization) {
            const userTestDB = await User.findOne({
                where: { user_name: ctx.request.body.user_name },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            auth = userTestDB.dataValues.credentials;
        } else { auth = header.Authorization }
        const base64Credentials = auth.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        if (ctx.request.body.password === credentials.split(':')[1]) {
            ctx.status = 200;
            ctx.body = { user: user.dataValues }
            await next()
        }

        else {
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