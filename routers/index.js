const router = require('koa-router')();
const axios = require('axios');
const Koa = require('koa');
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 在发送请求之前做
    const token = '475101e656f847468fe546fd1ae3e973'
    if (token) {
        config.headers['x-client-token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
}, (err) => {
    // 对请求错误做些什么
    return Promise.reject(err)
})

router.get('/', async ctx => {
    const res1 = await axios.get('http://corp.hrotest.huokesaas.com/api/code/common/jobType.json');
    console.log('中间层请求第三方接口', res1.data)
    await ctx.render('index', { title: res1.data[0].text })
    //await ctx.render('index', { title: '活科云——技术赋能商业领跑者' })
})

router.get('/aboutus', async ctx => {
    await ctx.render('aboutus', { title: '关于我们' })
})

router.get('/case', async ctx => {
    await ctx.render('case', { title: '案例' })
})

router.get('/freshSolutionEcomLanding', async ctx => {
    await ctx.render('freshSolutionEcomLanding', { title: '解决方案' })
})

router.get('/helpcenter', async ctx => {
    await ctx.render('helpcenter', { title: '帮助中心' })
})

router.get('/', async ctx => {
    await ctx.render('index', { title: '首页' })
})

router.get('/leapcloud', async ctx => {
    await ctx.render('leapcloud', { title: '产品' })
})

router.get('/news', async ctx => {
    await ctx.render('news', { title: '新闻' })
})


module.exports = router