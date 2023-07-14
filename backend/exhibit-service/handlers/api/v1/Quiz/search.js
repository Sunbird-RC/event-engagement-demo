'use strict';
var dataProvider = require('../../../../data/api/v1/Quiz/search.js');
/**
 * Operations on /api/v1/Quiz/search
 */
module.exports = {
    /**
     * summary: 
     * description: Search in quizes
     * parameters: body
     * produces: 
     * responses: 200
     */
    post: function (req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
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