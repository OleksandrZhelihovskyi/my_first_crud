const Koa = require('koa');
const {koaBody} = require("koa-body")
const router = require('./router/index')
const app = new Koa();
const cors = require('@koa/cors');


app.use(cors());
app.use(koaBody());
app.use(router.routes())
app.use(router.allowedMethods())
//app.use(json())
app.listen(2000, ()=>{console.log('http:localhost:2000')});