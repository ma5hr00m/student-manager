const Router = require('koa-router');
const studentController = require('../../../controllers/student.js');

const router = new Router();

router.delete('/api/v2/students/:id', studentController.delete);

module.exports = router;