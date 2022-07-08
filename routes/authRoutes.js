const express = require('express');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');
const fetch = require('node-fetch');

const removeExcessJson = require("../helperFunctions/removeExcessJson.js");
const searchByIds = require("../helperFunctions/searchByIds.js");

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const STATE_KEY = 'spotify_auth_state';
const BASE_URL = 'https://api.spotify.com/v1/';
const HOME = process.env.HOME;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

/**
 * We will ask user for permission to use following scopes
 */
const SCOPE = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state'
]

/**
 * Route for logging in to Spotify, redirects to a Spotify login page
 */
router.get('/login', async (req, res) => {
    let state = generateRandomString(16);
    res.cookie(STATE_KEY, state)
    let scope = '';
    SCOPE.forEach(element => scope += element + ' ');

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
      show_dialog: true,
    }));
});

/**
 * After logging in, we will go to our callback page
 */
router.get('/callback', function(req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

    if (state === null || state !== storedState) {
        res.redirect(`'http://localhost:3001/?'` +
          querystring.stringify({
            error: 'state_mismatch'
          }));
    } else {
    res.clearCookie(STATE_KEY);
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
        },
        headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        res.redirect('http://localhost:3001/?' +
            querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
            }));
        } else {
        res.redirect('http://localhost:3001/?' +
            querystring.stringify({
            error: 'invalid_token'
            }));
        }
    });
    }
});

/**
 * 
 */
router.get('/refresh_token', function(req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
});

/**
 * 
 */
router.post("/search/:token", async (req, res) => {

  const access_token = req.params.token


  /**
   * Take the search query and use spotify's search endpoint
   */
  const query = req.body.query.split(" ").join("%20");

  let response = await fetch(`${BASE_URL}search?type=track&q=${query}`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
    
  let data = await response.json(); //do we need await?

  //Helper function removes unnecessary info to send to client

  response = await searchByIds(data, access_token)

  res.send(response);
});

/**
 * 
 */
 router.post("/recommendations/:token", async (req, res) => {
  const access_token = req.params.token;
  const id = req.body.query;

  let response = await fetch(`${BASE_URL}recommendations?seed_tracks=${id}`, {
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
  });
  
  const data = await response.json();

  response = await searchByIds(data, access_token)

  res.send(response)
  // res.send(removeExcessJson(data));

});

module.exports = router;