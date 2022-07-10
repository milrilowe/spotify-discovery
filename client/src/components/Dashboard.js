import searchTracks from "../helperFunctions/searchTracks.js"
import recommendedTracks from "../helperFunctions/recommendedTracks.js"
import Searchbar from './Searchbar';
import SearchResults from './SearchResults'
import CurrentSong from './CurrentSong'
import WebPlayback from './WebPlayback'
import Recommendations from './Recommendations'
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Dashboard = ( { access_token, refresh_token }) => {
    const [query, setQuery] = useState();
    const [searchResults, setSearchResults] = useState();
    const [currentSong, setCurrentSong] = useState();
    const [recommendations, setRecommendations] = useState();
    

    // This is drilled to the Searchbar and the Searchbar will call it so we can change the state so that we can re-render SearchResults
    const onSearch = (query) => {
        setQuery(query)
    }

    //This is drilled to Track so when the card is clicked, we set current song
    const onClick = (song) => {
        setCurrentSong(song);
        setSearchResults(null);
    }  

    //
    const onAdd = (song, event) => {
        event.stopPropagation();
        console.log('added');
    }

    //When the current song changes, we need to set recommended songs
    useEffect(() => {
        const recommend = async() => {
            let recommendations = !currentSong ? null : await recommendedTracks(currentSong, access_token)
            setRecommendations(recommendations);
        }

        recommend();
    
    }, [currentSong]);

    //When we update our query, search for the query
    useEffect(() => {
        let cancel = false;

        const search = async () => {
            let result = !query ? null : await searchTracks(query, access_token)
            if(cancel) return;
            setSearchResults(result);
        }

        search();
        
        return () => (cancel = true)

    }, [query]);

    return (
        <div className = "dashboard" onClick = {null}>

        <Container className = "m-0" style = {{display: "flex"}}>
            <Container className = "m-1" style = {{maxWidth: "400px"}}>
                <Searchbar onSearch = {onSearch}/>
                <SearchResults searchResults = {searchResults} onClick = {onClick}/>
                <Recommendations recommendations = {recommendations} onClick = {onClick} onAdd ={onAdd} />
            </Container>


            <CurrentSong currentSong = {currentSong} />

        </Container>
        
        <Container className = "mb-2" align="center" style={{position:"absolute", bottom:"0"}}>
        <WebPlayback access_token = {access_token} currentSong = {currentSong} style/>
        </Container>




        </div>
    )
}

export default Dashboard