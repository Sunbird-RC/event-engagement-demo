const { default: axios } = require("axios");
const { checkAnswers, getExhibitByOsid } = require("./exhibitService");
const { createCredential } = require("./credentialService");
const { REGISTRY_URL } = require("../config/config");
const { _ } = require("lodash");
const { generateDid } = require("./identityService");
const { updateLatestPresentation } = require("./presentationService");
const { object } = require("swagmock/lib/generators");

const serviceUrl = `${REGISTRY_URL}/api/v1/Quiz`;

const createOrUpdate = async (exhibit, visitor, results) => {
    let quiz = await findQuizForVisitorMobileNumberAndExhibitOsid(visitor?.mobileNumber, exhibit?.osid);
    const quizExists = !!quiz;
    if (!quizExists) {
        quiz = {};
        const did = await generateDid("quiz");
        quiz.did = did;
        quiz.exhibitOsid = _.get(exhibit, "osid", "");
        quiz.exhibitName = _.get(exhibit, "name", "");
        quiz.exhibitOrganization = _.get(exhibit, "organization", "");
        quiz.title = _.get(exhibit, "quizConfig.title", _.get(exhibit, "name", "default"));
        quiz.visitorName = _.get(visitor, "name");
        quiz.visitorMobileNumber = _.get(visitor, "mobileNumber");
        quiz.attemptCount = 1;
    } else {
        quiz.attemptCount += 1;
    }
    quiz.date = new Date().toISOString();
    quiz = {...quiz, results};
    let url = `${serviceUrl}`;
    let method = 'post';
    if (quizExists) {
        url = `${serviceUrl}/${quizOsid}`;
        method = 'put';
    }
    await axios.request({
        url,
        method,
        headers: {
            'Content-Type': "application/json",
            'Accept': "*/*",
        },
        data: quiz
    });
};

const getQuizByOsid = async (quizOsid) => {
    return axios.get(`${serviceUrl}/${quizOsid}`, {
        'Content-Type': "application/json",
        'Accept': "*/*",
    }).then(results => results.data);
};

const findQuizForVisitorMobileNumberAndExhibitOsid = async (mobileNumber, exhibitOsid) => {
    const payload = {
        offset: 0,
        limit: 1,
        filters: {
          visitorMobileNumber: {
            eq: `${mobileNumber}`
          },
          exhibitOsid: {
            eq: exhibitOsid
          }
        }
    };
    return axios.post(`${serviceUrl}/search`, payload)
    .then(results => results?.data[0]);
};

const listQuizForVisitorMobileNumber = async (mobileNumber) => {
    const payload = {
        offset: 0,
        limit: 1000,
        filters: {
          visitorMobileNumber: {
            eq: `${mobileNumber}`
          }
        }
    };
    return axios.post(`${serviceUrl}/search`, payload)
    .then(results => results.data);
};

const submitQuiz = async (exhibitOsid, visitor, submissions) => {
    const exhibit = await getExhibitByOsid(exhibitOsid);
    const result = checkAnswers(submissions, exhibit?.quizConfig?.questions);
    await createOrUpdate(exhibit, visitor, result);
    if (result?.badgeWon) {
        await createCredential(exhibit, visitor);
        await updateLatestPresentation(visitor);
    }
    return result?.badgeWon;
};

const listQuiz = async (headers) => {
    return axios.get(serviceUrl).then(resp => resp?.data)
    .then(quizes => quizes.map(d => ({
        ...d,
        results: {
            score: d?.score,
            totalScore: d?.totalScore,
            badgeWon: d?.badgeWon
        }
    })));
};

const searchQuizByKeyValue = async (key, value) => {
    const payload = {
        offset: 0,
        limit: 1000,
        filters: {
          [key]: {
            eq: value
          }
        }
    };
    return axios.post(`${serviceUrl}/search`, payload)
    .then(results => results.data);
}

const getLeaderboard = async () => {
    const allQuizes = await searchQuizByKeyValue("badgeWon", true);
    const visitorQuizes = allQuizes.reduce((result, item) => {
        if(!(item?.visitorMobileNumber in result)) {
            result[item?.visitorMobileNumber] = {
                name: item?.visitorName,
                mobileNumber: item?.visitorMobileNumber,
                badges: 0,
                attempts: 0,
                score: 0,
            }
        }
        result[item?.visitorMobileNumber] = {
            ...result[item?.visitorMobileNumber],
            badges: result[item?.visitorMobileNumber].badges + 1,
            attempts: result[item?.visitorMobileNumber].attempts + item?.attempts,
            score: result[item?.visitorMobileNumber].score + item?.score,
        }
        return res;
    }, {});
    return sortLeaderboard(visitorQuizes);
}

const sortLeaderboard = (visitorQuizes) => {
    return Object.values(visitorQuizes)
    .sort((a, b) => {
        if(a?.badges === b?.badges && a?.attempts === b?.attempts) {
            return b?.score - a?.score;
        }
        if(a?.badges === b?.badges) return a?.attempts - b?.attempts;
        return b?.badges - a?.badges;
    });
}

module.exports = {
    createQuiz: () => {},
    createOrUpdate,
    getQuizByOsid,
    deleteQuiz: async () => {},
    listQuiz,
    listQuizForVisitorMobileNumber,
    submitQuiz,
    getLeaderboard,
}