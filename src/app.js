const Koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
require('dotenv').config()

// const send = require('koa-send');
// const path = require('path');
const koaBody = require('koa-body');

const app = new Koa();

const router = require('../routes/index');

const PORT = process.env.PORT;

app.use(cors());
// app.use(koaBody());
app.use(koaBody({ multipart: true }));
app.use(bodyParser());
app.use(router());

// Sapp.use(allowedMethods());

app.listen(PORT, () => {
    console.log(`server work port: ${PORT}`);
});


//"prettier --write",
//       "eslint --fix --max-warnings 0",
//       "git add" 