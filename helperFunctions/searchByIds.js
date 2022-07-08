const removeExcessJson = require("../helperFunctions/removeExcessJson.js");

const fetch = require('node-fetch');

const BASE_URL = 'https://api.spotify.com/v1/';

const searchByIds = async (data, access_token) => {

  /**
   * Spotify's search endpoint is bugged and so we actually need to search each track received from the search by its ID
   */
   let response = await fetch(`${BASE_URL}me`, {
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
  })

  const user = await response.json();  //do we need await?
  const market = user.country;

  let ids = ''
  if(data.tracks.items) {
    data.tracks.items.map((track) => {
      ids += `${track.id},`
    })
  } else {
    data.tracks.map((track) => {
      ids += `${track.id},`
    })
  }

  response = await fetch(`${BASE_URL}tracks?ids=${ids.slice(0,-1)}&market=${market}`, {
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
  })

  data = await response.json();

  return removeExcessJson(data);

}

module.exports = searchByIds