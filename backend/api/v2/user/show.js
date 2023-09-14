const Router = require('koa-router');
const userController = require('../../../controllers/user.js');

const router = new Router();

router.get('/api/v2/users', userController.show);

module.exports = router;