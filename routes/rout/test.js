const Router = require('koa-router');

const router = new Router();

router.get('/test', async (ctx, next) => {
    try {
        ctx.status = 200;
        ctx.body = { top: 'curs' };

    } catch (error) {
        console.log('error');
        ctx.status = 500;
        ctx.body = { message: 'error' };
    }
    next();
});

module.exports = router;