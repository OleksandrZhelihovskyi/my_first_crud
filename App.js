const Koa = require('koa');
const { koaBody } = require("koa-body")
const router = require('./router/index')
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(2000, () => { console.log('http://localhost:2000') });
