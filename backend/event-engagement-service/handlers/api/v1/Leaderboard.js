'use strict';

const { getLeaderboard } = require("../../../services/quizService");

/**
 * Operations on /api/v1/Leaderboard/
 */
module.exports = {
    get: async function (req, res, next) {
        getLeaderboard()
        .then(results => {
            res.send(results);
        }).catch(err => {
            next(err, req, res, next);
        });
    }
};
