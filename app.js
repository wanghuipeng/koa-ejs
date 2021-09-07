const Koa = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const app = new Koa()
const staticCache = require('koa-static-cache')
const views = require('koa-views')



// 缓存
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './static'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(bodyParser({
    formLimit: '1mb'
}))

//  路由
app.use(require('./routers/demo.js').routes())
app.use(require('./routers/index.js').routes())




app.listen(3002);
console.log("koa start http://localhost:3002");