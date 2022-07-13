import makeRequest from "./makeRequest.js"
import refreshToken from "./refreshToken.js"

const recommendedTracks = async (currentSong, access_token) => {
    let url = `./recommendations/${access_token}`;
    // let url = `http://localhost:3000/recommendations/${access_token}`;
    let data = await makeRequest("POST", url, currentSong.id);
    return data;
    
}

export default recommendedTracks