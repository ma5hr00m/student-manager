const Router = require('koa-router');
const studentController = require('../../../controllers/student.js');

const router = new Router();

router.post('/api/v2/students', studentController.create);

module.exports = router;