const makeRequest = require("./makeRequest.js");
const refreshToken = require("./refreshToken.js");

const recommendedTracks = async (currentSong, access_token) => {

    let url = `https://spotify-discover-music.herokuapp.com/${access_token}`;
    let data = await makeRequest("POST", url, currentSong.id);
    return data;
    
}

module.exports = recommendedTracks