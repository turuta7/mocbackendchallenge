const Router = require('koa-router');

const WebSocket = require('ws');

const router = new Router();

router.post('/', async (ctx, next) => {
    try {
        const { body } = ctx.request;


        ctx.status = 200;
        ctx.body = 'Server work';

        const url = 'ws://localhost:8080'
        const connection = new WebSocket(url)

        connection.onopen = () => {
            connection.send(body.message)
        }

        connection.onerror = (error) => {
            console.log(`WebSocket error: ${error}`)
        }

        connection.onmessage = (e) => {
            console.log(e.data)
        }

    } catch (error) {
        console.log('error');
        ctx.status = 500;
        ctx.body = { message: 'error' };
    }
    next();
});

module.exports = router;