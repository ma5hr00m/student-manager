const Router = require('koa-router');
const studentController = require('../../../controllers/student.js');

const router = new Router();

router.get('/api/v2/students', studentController.show);

module.exports = router;