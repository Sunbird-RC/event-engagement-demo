var session = require('express-session');
var Keycloak = require('keycloak-connect');
const { KEYCLOAK_URL, KEYCLOAK_REALM } = require('./config');

let _keycloak;

let _memoryStore;

Keycloak.prototype.redirectToLogin = function(req) {
    return true;
};

var keycloakConfig = {
    "realm": KEYCLOAK_REALM,
    "auth-server-url": KEYCLOAK_URL,
    "ssl-required": "external",
    "resource": "registry-frontend",
    "public-client": true,
    "confidential-port": 0
  };

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        _memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: _memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

const startSession = () => {
    return session({
        secret: 'some secret',
        resave: false,
        saveUninitialized: true,
        store: _memoryStore
      });
}

module.exports = {
    initKeycloak,
    getKeycloak,
    startSession
};