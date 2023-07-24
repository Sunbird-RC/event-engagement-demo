'use strict';

const { updateExhibitProperty } = require("../../../../../services/exhibitService");

/**
 * Operations on /api/v1/Exhibit/{entityId}/{property}
 */
module.exports = {
    put: function (req, res, next) {
        const osid = req?.params?.entityId;
        const property = req?.params?.property;
        updateExhibitProperty(osid, property, req?.body?.value).then(results => {
            res.send(results);
        }).catch(err => {
            next(err, req, res, next);
        });
    }
};
