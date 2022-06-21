import Searchbar from './Searchbar';
import SearchResults from './SearchResults'
import CurrentSong from './CurrentSong'
import WebPlayback from './WebPlayback'
import Recommendations from './Recommendations'
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const makeRequest = require("../helperFunctions/makeRequest.js");

// const SpotifyWebPlayback = require('https://sdk.scdn.co/spotify-player.js');

const Dashboard = ( { access_token, refresh_token }) => {
    const [query, setQuery] = useState();
    const [searchResults, setSearchResults] = useState();
    const [currentSong, setCurrentSong] = useState();
    const [recommendations, setRecommendations] = useState();


    // This is drilled to the Searchbar and the Searchbar will call it so we can change the state so that we can re-render SearchResults
    const onSearch = (query) => {
        searchTracks(query)
    }

    //This is drilled to Track so when the card is clicked, we set current song
    const onClick = (song) => {
        setCurrentSong(song);
        setSearchResults('');
    }  
    
    /**
     * Requests recommended tracks for current song
     */
    const recommendedTracks = async () => {
        let url = `http://localhost:3000/recommendations/${access_token}`;
        let data = await makeRequest("POST", url, currentSong.id);
        
        if(data) {
            console.log(data)
            setRecommendations(data);
        }
    }

    /**
     * Requests a list of tracks based on search query
     */
    const searchTracks = async (query) => {
        if (query !== '') {
            let url = `http://localhost:3000/search/${access_token}`;
            let data = await makeRequest("POST", url, query)
            if (data) {
                setSearchResults(data);
            }
        }
    }

    /**When the current song changes, we need to set recommended songs */
    useEffect(() => {
        if(currentSong) {
            recommendedTracks();
        }
    }, [currentSong]);

    return (
        <div className = "dashboard">

            <Container>
                <Searchbar onSearch = {onSearch}/>
                <SearchResults searchResults = {searchResults} onClick = {onClick}/>
            </Container>

            <Container>
                <Recommendations recommendations = {recommendations} onClick = {onClick} />
            </Container>
            
            <Container>

            <Container>
                <CurrentSong currentSong = {currentSong} />
            </Container>

            <Container className = "mb-2" align="center" style={{position:"absolute", bottom:"0"}}>
                <WebPlayback access_token = {access_token} currentSong = {currentSong} style/>
            </Container>

            </Container>
        </div>
    )
}

export default Dashboard