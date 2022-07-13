import React, { useState, useEffect } from 'react';
import {Container, Image } from 'react-bootstrap'
import Play from './Play'
import '../App.css'

function WebPlayback({ access_token, currentSong }) {
    /**
     * We need to move this to be handled by server
     */
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: "Spotify Discovery",
                getOAuthToken: (cb) => {
                  cb(access_token);
                },
                volume: 0.5,
              });
        
          
            // Player Ready
            player.addListener("ready", ({ device_id }) => {
              console.log("Ready with Device ID", device_id);
            
                // After player is ready, change current device to this player
                const connect_to_device = () => {
                    console.log("Changing to device");
                    let change_device = fetch("https://api.spotify.com/v1/me/player", {
                    method: "PUT",
                    body: JSON.stringify({
                        device_ids: [device_id],
                        play: false,
                    }),
                    headers: new Headers({
                        Authorization: "Bearer " + access_token,
                    }),
                    }).then((response) => console.log(response));
                };

                connect_to_device();

            });
          
            // Not Ready
            player.addListener("not_ready", ({ device_id }) => {
              console.log("Device ID has gone offline", device_id);
            });
          
            // Error Handling
            player.addListener("initialization_error", ({ message }) => {
              console.error(message);
            });
            player.addListener("authentication_error", ({ message }) => {
              console.error(message);
            });
            player.addListener("account_error", ({ message }) => {
              console.error(message);
            });
          
            // Start device connection
            player.connect().then((success) => {
              if (success) {
                console.log("The Web Playback SDK successfully connected to Spotify!");
              }
            });
          
            // Toggle Play Button
            document.getElementById("togglePlay").onclick = function () {
              player.togglePlay();
            };
          
          };
    }, []);

    const play_song = async (uri) => {
        console.log("Changing song");
        let request_answer = await fetch(
          "https://api.spotify.com/v1/me/player/play",
          {
            method: "PUT",
            body: JSON.stringify({
              uris: [uri],
            }),
            headers: new Headers({
              Authorization: "Bearer " + access_token,
            }),
          }
        ).then((data) => console.log(data));
      };

    return (

                <Container>
                  {currentSong ? <div className = "play" onClick = {() => {
                  play_song(`spotify:track:${currentSong.id}`);
              }}><Play /></div> : ''}

            </Container>

    );
}

export default WebPlayback