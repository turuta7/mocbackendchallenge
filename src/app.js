const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
require('dotenv').config()
// const send = require('koa-send');
const koaBody = require('koa-body');

const app = new Koa();

// const WebSocketServer = require('ws').Server,

const WebSocket = require('ws')

// web Socket
const wss = new WebSocket.Server({ port: 8080 })
wss.on('connection', ws => {
    ws.on('message', message => {
        //  console.log(massage.join);

        console.log(`test: ${message}`)
    })


    // ws.send('Hello! turuta')
})


const router = require('../routes/index');

const { PORT } = process.env;

app.use(cors());
app.use(koaBody({ multipart: true }));
app.use(bodyParser());
app.use(router());
app.listen(PORT, () => {
    console.log(`server work port: ${PORT}`);
});


// "prettier --write",
//       "eslint --fix --max-warnings 0",
//       "git add" 