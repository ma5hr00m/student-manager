const Router = require('koa-router');
const userController = require('../../../controllers/user.js');

const router = new Router();

router.post('/api/v2/users', userController.auth);

module.exports = router;