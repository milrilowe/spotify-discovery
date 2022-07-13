import makeRequest  from "./makeRequest.js"
import refreshToken  from "./refreshToken.js"

const searchTracks = async (query, access_token) => {
    let url = `${process.env.BASE_URL}search/${access_token}`;
    let data = await makeRequest("POST", url, query)
    return data;
}

export default searchTracks