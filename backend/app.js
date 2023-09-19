const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const InitManager = require('./core/init');

const app = new Koa();

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));

app.use(bodyParser());
InitManager.initCore(app);

app.listen(3000);
console.log(`🎁 Listening on localhost:3000 ...`);