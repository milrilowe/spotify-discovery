const makeRequest = require("./makeRequest.js");
const refreshToken = require("./refreshToken.js");

const searchTracks = async (query, access_token) => {
    let url = `https://spotify-discover-music.herokuapp.com/search/${access_token}`;
    let data = await makeRequest("POST", url, query)
    return data;
}

module.exports = searchTracks