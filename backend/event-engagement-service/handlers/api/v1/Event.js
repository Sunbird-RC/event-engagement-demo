'use strict';
var dataProvider = require('../../../data/api/v1/Event.js');
/**
 * Operations on /api/v1/Event
 */
module.exports = {
    get: function (req, res, next) {
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    post: function (req, res, next) {
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
