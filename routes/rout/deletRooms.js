const Router = require('koa-router');

const router = new Router();

const Rooms = require('../../models').rooms;

router.delete('/rooms/:id', async (ctx, next) => {
    const { id } = ctx.params;
    try {

        if (!Number(id)) {
            ctx.status = 500;
            ctx.body = { message: 'error ID' }
            return
        }





        const room = await Rooms.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (room === null) {
            ctx.status = 500;
            ctx.body = { message: 'room not in DB' }
            return
        }
        await Rooms.destroy({
            where: { id },
        })

        ctx.status = 200;
        ctx.body = { result: 'room removed successfully' }
        await next()


    } catch (error) {
        console.log('error');
        ctx.status = 500;
        ctx.body = { message: 'error' };
    }

});

module.exports = router;