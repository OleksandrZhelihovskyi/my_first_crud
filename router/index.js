const router = require('koa-router')();

const Task = require('../api/crud');



router.get('/api/user-data', async (ctx, next) => {
        const result = await Task.getTask(ctx.request.query);
        ctx.body = result;
})

router.put('/api/user-data', async (ctx, next) => {
        const result = await Task.putTask(ctx.request.body);
        ctx.body = result;
});

router.patch('/api/user-data', async (ctx, next) => {
        const result = await Task.updateTask(ctx.request.body);
        ctx.body = result;
});
router.del(`/api/user-data/:id`, async (ctx, next) => {
        const result = await Task.deleteTask(ctx.params.id);
        ctx.body = result;
});

module.exports = router;