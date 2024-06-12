const http = require("http");
const express = require("express");
const app = express();
var timeout = require('connect-timeout');
app.use(timeout('30s'));
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');

var NODE_ENV = 'test';

app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 100000,
}));

app.use(express.json({
    type: "application/json",
    limit: '50mb'
}));

app.use(cors());

app.get('/welcome', (req, res) => { res.send('Welcome for Demo Lambda succeed!!!'); });

app.get('/hello', (req, res) => { res.json({ message: 'Welcome for Demo Lambda succeed!!!' }); });

if (NODE_ENV === 'development') {
    app.set("port", process.env.PORT || 3001);
    let server = http.createServer(app);
    server.listen(app.get("port"), "0.0.0.0", () => {
        console.log(`Express server listening on http://localhost:${app.get("port")}`);
    });
} else {
    const serverless = require("serverless-http");
    module.exports.handler = serverless(app);
}