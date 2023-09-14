const Router = require('koa-router');

const router = new Router();

router.get('/ping',async ctx => {
    ctx.body = 'pong!';

    console.log('[PING]');
});

module.exports = router;