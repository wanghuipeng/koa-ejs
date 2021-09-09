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
    const token = 'abea386c6b0f409e85f26eb6bf63500e'
    if (token) {
        config.headers['x-client-token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
}, (err) => {
    // 对请求错误做些什么   
    return Promise.reject(err)
})

router.get('/demo', async ctx => {
    let res = null
    let params = { "pageNumber": 1, "pageSize": 30 }
    try {
        res = await axios.post('https://h.dalieyingcai.com/api/position/getPositionList', params);
    } catch (error) {
        console.log('error', error)
    } finally {
        let { data } = res && res.data
        let { records } = data
        let imgs = []
        records && records.filter(item => {
            imgs.push(item.logoImg)
        })
        console.log('中间层请求第三方接口', imgs.length)
        await ctx.render('demo', { title: 'demo页面', tableData: imgs })
    }
})


module.exports = router