const Router = require('koa-router');

const router = new Router();

const Rooms = require('../../models').rooms;
const User = require('../../models').user;

router.post('/rooms', async (ctx, next) => {
    const { header } = ctx.request;
    const { body } = ctx.request
    console.log(body);

    try {
        if (!header) {
            ctx.status = 500;
            ctx.body = { message: 'error header' };
            return;
        }
        if (!body.name || !body.user_id) {
            ctx.status = 500
            ctx.body = { message: 'error' };
            return;
        }
        const room = await Rooms.findOne({
            where: { room_name: body.name },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        const user = await User.findOne({
            where: { id: body.user_id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (user === null) {
            ctx.status = 500;
            ctx.body = { message: 'user not DB' }
            return
        }

        if (room === null) {
            await Rooms.create({
                room_name: body.name,
                creator_id: body.user_id
            })
            const roomTestDB = await Rooms.findOne({
                where: { room_name: body.name },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            ctx.status = 200;
            ctx.body = await roomTestDB.dataValues
            next()
            return
        }

        ctx.status = 500;
        ctx.body = { message: 'chat room in DB' }
        await next()


    } catch (error) {
        console.log('error');
        ctx.status = 500;
        ctx.body = { message: 'error' };
    }

});

module.exports = router;