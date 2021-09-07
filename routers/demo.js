const router = require('koa-router')();

router.get('/demo', async ctx => {
    await ctx.render('demo', { title: '首页' })
})

module.exports = router