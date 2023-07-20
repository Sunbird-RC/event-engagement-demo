'use strict';
const { listExhibit, createExhibit } = require('../../../services/exhibitService.js');
const { getCurrentUser } = require('../../../services/utils.js');
const { _ } = require("lodash");
/**
 * Operations on /api/v1/Exhibit
 */
module.exports = {
    get: async function (req, res, next) {
        let currentUser;
        try {
            currentUser = await getCurrentUser(req);
        } catch(err) {}
        listExhibit(req?.headers).then(results => {
            const response = results?.reduce((result, item) => {
                const osid = _.get(item, "osid");
                if (_.get(currentUser, "exhibitsVisited", []).some(d => d === osid)) {
                    return { ...result, visited: [...result?.visited, item]};
                }
                return { ...result, unvisited: [...result?.unvisited, item]};
            }, { visited: [], unvisited: [] })
            res.send(response);
        }).catch((err) => {
            next(err)
        })
    },
    post: function (req, res, next) {
        createExhibit(req.body, req.headers).then(results => {
            res.status(200).send(results);
        }).catch((err) => {
            next(err)
        })
    }
};
