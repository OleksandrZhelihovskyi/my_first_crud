const router = require('koa-router')();

const Task = require('../api/crud');



router.get('/api/tasks', async (ctx, next) => {
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
router.put('/api/user-data', async (ctx, next) => {
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

router.patch('/api/user-data', async (ctx, next) => {
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
router.del(`/api/user-data/:id`, async (ctx, next) => {
    try {console.log(ctx.params.id)
        const result = await Task.deleteTask(ctx.params.id);
        ctx.body = result;
    }
    catch (err) {
        console.log('err', err)
        ctx.status = 204
        ctx.body = err
    }
});
module.exports = router;