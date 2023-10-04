const router = require('koa-router')();

const Task = require('../api/crud');



router.get('/api/tasks', async (ctx, next) => {
    try {
        const result = await Task.getTask();
        ctx.body = result;
    }
    catch (err) {
        await next(err);
    }
})

router.put('/api/user-data', async (ctx, next) => {
    try {
        const result = await Task.putTask(ctx.request.body);
        ctx.body = result;
    }
    catch (err) {
        await next(err);
    }
});

router.patch('/api/user-data', async (ctx, next) => {
    try {
        const result = await Task.updateTask(ctx.request.body);
        ctx.body = result;
    }
    catch (err) {
        await next(err);
    }
});
router.del(`/api/user-data/:id`, async (ctx, next) => {
    try {
        const result = await Task.deleteTask(ctx.params.id);
        ctx.body = result;
    }
    catch (err) {
        await next(err);
    }
});
router.use((ctx, err) => {
    console.log('err', err)
    ctx.status = 500// fixed to 500
    ctx.body = err
    
})
process.on("uncaughtException", function (err) {
    process.exit(); 
});
module.exports = router;