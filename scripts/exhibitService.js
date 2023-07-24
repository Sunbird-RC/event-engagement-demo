const { default: axios } = require("axios");

const IDENTITY_URL = "http://localhost:3332"
const serviceUrl = `http://localhost:8081/api/v1/Exhibit`;

const token = "";


const saveExhibit = async (searchBy, value, payload) => {
    const entity = await getExhibitByKeyValue(searchBy, value);
    const finalEntity = {
        ...entity,
        ...payload,
        quizConfig: {
            title: "Quiz",
            ...entity?.quizConfig,
            ...payload?.quizConfig,
        }
    };
    if (!finalEntity?.did) {
        const did = await generateDid("exhibit");
        finalEntity["did"] = `${did}`;
    }
    if(!!entity) return axios.put(`${serviceUrl}/${finalEntity.osid}`, finalEntity).then(resp => resp.data);
    return axios.post(serviceUrl, finalEntity, 
        {
            headers: {
                // Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.data);
};

const getExhibitByKeyValue = async (key, value) => {
    const payload = {
        "offset": 0,
        "limit": 1,
        "filters": {
            [key]: {
                "eq": value
              }
        }
    }
    const exhibit = await searchExhibit(payload);
    return exhibit && exhibit?.length > 0 && exhibit[0];
};

const searchExhibit = async (payload) => {
    return axios.post(`${serviceUrl}/search`, payload)
    .then(results => results?.data);
};

const generateDid = async (entityName) => {
    const payload = {
        "content": 
            [
                {
                    "alsoKnownAs": [],
                    "services": [
                        {
                            "id": "IdentityHub",
                            "type": "IdentityHub",
                            "serviceEndpoint": {
                                "@context": "schema.identity.foundation/hub",
                                "@type": "UserServiceEndpoint",
                                "instance": [
                                    "did:test:hub.id"
                                ]
                            }
                        }
                    ],
                    "method": `upai:${entityName}`
                }
            ]
        
    }
    const did = await axios.post(`${IDENTITY_URL}/did/generate`, payload)
    .then(result => {
        return result?.data[0]?.id;
    })
    return did || "default";
}



module.exports = {
    saveExhibit,
}