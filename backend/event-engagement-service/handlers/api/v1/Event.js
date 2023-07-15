'use strict';
var dataProvider = require('../../../data/api/v1/Event.js');
var axios = require('axios');
var constant = require('../../../constants.js');
var {generateDID} = require('../../../utils.js');
/**
 * Operations on /api/v1/Event
 */
module.exports = {
    /**
     * summary: 
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     */
    get: function (req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var errStatus = 500;
        try{ 
            axios.get(`${constant.registryUrl}/api/v1/Event`).then((resFromReg) => {
                res.status(status).send(resFromReg.data);
            })
        } catch (err) {
            res.status(errStatus).send(err);
        }

    },
    /**
     * summary: 
     * description: Create new Event
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
        var errStatus = 500;
        try{ 
            let reqToSend = req.body;
            reqToSend["did"] = generateDID("someName");
            axios.post(`${constant.registryUrl}/api/v1/Event`, reqToSend).then((resFromReg) => {
                res.status(status).send(resFromReg.data);
            })

        } catch (err) {
            res.status(errStatus).send(err.response.data);
        }
    }
};
