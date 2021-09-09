const Koa = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const app = new Koa()
const staticCache = require('koa-static-cache')
const views = require('koa-views');

// 启动监听（浏览器端）
var bs = require('browser-sync').create();
app.listen(3002, function() {
    bs.init({
        open: false,
        ui: false,
        notify: false,
        proxy: 'localhost:3002',
        files: ['./views/**', './routers/*'],
        port: 8080
    });
    console.log('前端浏览器刷新', 'App (dev) is going to be running on port 8080 (by browsersync).');
});

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





//启动监听（服务器端）
// var debug = require('debug')('node-ejs'); // debug模块
// app.listen(3002, function() {
//     debug('Koa server listening on port ' + server.address().port);
//     console.log('后台服务器刷新')
// });







// app.listen(3002);
console.log("koa start http://localhost:3002");