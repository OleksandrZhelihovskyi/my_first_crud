const router = require('koa-router')();

const Task = require('../api/crud');



router.get('/', async (ctx, next) => {
    try {
        const result = await Task.getTask();
        ctx.body = result;
    }
    catch (err) {
        console.log('err', err)
        ctx.status = 500
        ctx.body = err
    }
});
router.put('/app_put', async (ctx, next) => {
    try {
        const result = await Task.putTask(ctx.request.body);
        ctx.body = result;
    }
    catch (err) {
        console.log('err', err)
        ctx.status = 204
        ctx.body = err
    }
});

router.post('/app_update', async (ctx, next) => {
    try {
        const result = await Task.updateTask(ctx.request.body);
        ctx.body = result;
    }
    catch (err) {
        console.log('err', err)
        ctx.status = 500
        ctx.body = err
    }
});
router.post('/app_delete', async (ctx, next) => {
    try {
        const result = await Task.deleteTask(ctx.request.body);
        ctx.body = result;
    }
    catch (err) {
        console.log('err', err)
        ctx.status = 204
        ctx.body = err
    }
});
module.exports = router;