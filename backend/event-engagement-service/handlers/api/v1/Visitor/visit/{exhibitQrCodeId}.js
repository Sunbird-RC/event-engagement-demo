'use strict';
const { getCurrentUser } = require('../../../../../services/utils.js');
const { markExhibitAsVisited } = require('../../../../../services/visitorService.js');
/**
 * Operations on /api/v1/Visitor/visit/{exhibitOsid}
 */
module.exports = {
    put: async function (req, res, next) {
        const exhibitQrCodeId = req?.params?.exhibitQrCodeId;
        getCurrentUser(req)
        .then(visitor => {
            markExhibitAsVisited(exhibitQrCodeId, visitor, req.headers)
            .then(() => {
                res.send({
                    message: "SUCCESSFUL"
                });
            })
            .catch((err) => {
                next(err, req, res, next);
            })
        })
        .catch((err) => {
            next(err, req, res, next);
        });
        
    }
};
