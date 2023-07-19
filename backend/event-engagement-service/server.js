'use strict';

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var SwaggerUI = require("swaggerize-ui");
var Path = require('path');
const constants = require('./config/config');
const { _ } = require("lodash");
const cors = require('cors')
const { initKeycloak, startSession } = require('./config/keycloak-config.js');

var App = Express();

var Server = Http.createServer(App);

App.use(cors());
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: true
}));
const keycloak = initKeycloak();
App.use(startSession());
App.use(keycloak.middleware());

App.get('/', keycloak.protect(),  function(req, res){
    res.send("Server is up!");
 });

 App.all(["/api/v1/*"], (req, res, next) => {
    if((req.method === 'POST' && ['/api/v1/Visitor', '/api/v1/Exhibit', '/api/v1/Event', '/api/v1/Exhibit/search']
    .some(d => req.path === d))
    || (req.method === 'GET' && _.startsWith('/api/v1/QRCode/', req.path)
     && _.endsWith('/verify', req.path))
     || (req.method === 'GET' && ((req.path === '/api/v1/Exhibit') 
     || /\/api\/v1\/Exhibit\/([a-z]|[0-9]|\-)*/.test(req.path)))) {
        next();
    }else{
        keycloak.protect()(req, res, next);
    }
    // next();
 });


App.use(Swaggerize({
    api: Path.resolve('./config/swagger.yml'),
    docspath: "/api-docs",
    handlers: Path.resolve('./handlers')
}));

App.use('/swagger', SwaggerUI({
    docs: '/api-docs'
}));

App.use(function(err, req, res, next) {
    console.error("Error occurred for ")
    console.error("URL: ", req.url)
    // if (config.LOG_LEVEL === "DEBUG") {
    //     console.error("BODY: ", req.body)
    //     console.error("HEADERS: ", req.headers)
    // }
    if (err && err?.name === "AxiosError") {
        res.status(err?.response?.status || 400).send({
            "status": err?.response?.data?.params?.status,
            "message": err?.response?.data?.params?.errmsg,
            "responseCode": err?.response?.data?.responseCode
        })
    } else {
        res.status(500).send({
            "message": err?.message
        });
    }
});

Server.listen(8000, function () {
    console.log("Server URL: ", constants.CREDENTIAL_SCHEMA_URL);
    App.swagger.api.host = this.address().address + ':' + this.address().port;
    /* eslint-disable no-console */
    console.log('App running on %s:%d', this.address().address, this.address().port);
    /* eslint-disable no-console */
});
