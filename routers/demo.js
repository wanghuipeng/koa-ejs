const router = require('koa-router')();
const axios = require('axios');
const Koa = require('koa');
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
axios.create({
    headers: {
        'Cache-Control': 'no-cache'
    }
});

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

// 连接数据库
const sequelise = require('../database')
const UserModule = require('../database/modules/user')

// demo页
router.get('/demo', async ctx => {
    console.log('连接数据库')
    let result = await UserModule.find(ctx.query)
    console.log('result----', result, typeof result)
    let imgs = []
    result && result.filter(item => {
        imgs.push(item.telephone)
    })
    console.log('koa接口', imgs, typeof imgs, imgs.length)
    await ctx.render('demo', { title: 'demo页面', tableData: imgs })

    // let res = null
    // let params = { "pageNumber": 1, "pageSize": 10 }
    // try {
    //     res = await axios.post('https://h.dalieyingcai.com/api/position/getPositionList', params);
    // } catch (error) {
    //     console.log('error', error)
    // } finally {
    //     let { data } = res && res.data
    //     let { records } = data
    //     let imgs = []
    //     records && records.filter(item => {
    //         imgs.push(item.logoImg)
    //     })
    //     console.log('中间层请求第三方接口', imgs.length)
    //     await ctx.render('demo', { title: 'demo页面', tableData: imgs })
    // }
})

// 申请体验页
router.get('/signUp', async ctx => {
    await ctx.render('signUp', { title: '申请体验页面', message: '' })
})

//接收post提交的数据
router.post('/toSingUp', async ctx => {
    //原生nodejs 在koa中获取表单提交的数据
    console.log('提交数据', ctx.request.body);
    const {
        telephone,
        password,
        companyName
    } = ctx.request.body
    let result = await UserModule.findUserByTelephone({
        telephone
    })
    console.log(2222222222222, result)

    let isNewRecord = result && result.isNewRecord
    console.log(111111, isNewRecord)

    if (isNewRecord === null) {
        await UserModule.add({
            telephone,
            password,
            companyName
        })
        await ctx.render('signUp', { title: '申请体验页面', message: '恭喜您，申请体验成功！' })
    } else if (isNewRecord === false) {
        await ctx.render('signUp', { title: '申请体验页面', message: '您已申请过，无需再申请了' })
    }
})

module.exports = router