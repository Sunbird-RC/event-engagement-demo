const { default: axios } = require("axios");
const { REGISTRY_URL} = require("../config/config");
const { _ } = require("lodash");
const { getKeycloak } = require("../config/keycloak-config");
const { getExhibitByMobileNumber } = require("./exhibitService");

const getVisitorByMobileNumber = async (mobileNumber) => {
    const payload = {
        "offset": 0,
        "limit": 1,
        "filters": {
          "mobileNumber": {
            "eq": mobileNumber
          }
        }
    }
    return axios.post(`${REGISTRY_URL}/api/v1/Visitor/search`, payload).then(results => results?.data[0]);
};

const parseTokenFromRequest = (req) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    return authHeader?.split(' ')?.length == 2 && authHeader?.split(' ')[1];
}

const getCurrentUser = async (req) => {
    console.log("Fetching current user info");
    const keycloak = getKeycloak();
    const token = parseTokenFromRequest(req);
    if(!token) throw new Error("Unauthorized")
    let results = await keycloak?.grantManager?.userInfo(token);
    let mobileNumber = _.get(results, "preferred_username");
    if (!mobileNumber) throw new Error("mobile number not valid");
    let entity = _.get(results, "entity[0]");
    if (!entity) throw new Error("Entity name not found");
    if(entity === "Visitor") {
        console.log("Fetching visitor for mobile number");
        return getVisitorByMobileNumber(mobileNumber);
    }
    throw new Error("Entity not allowed");
}

module.exports = {
    getCurrentUser,
}