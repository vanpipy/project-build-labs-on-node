const Router = require('koa-router');

const router = new Router();

router.get('/api/:id', (ctx, next) => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = {
        alert: 'you are in!!!',
        params: ctx.params
    };
});

module.exports = router;
