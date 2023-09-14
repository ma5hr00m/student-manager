const Router = require('koa-router');
const studentController = require('../../../controllers/student.js');

const router = new Router();

router.patch('/api/v2/students/:id', studentController.update);

module.exports = router;