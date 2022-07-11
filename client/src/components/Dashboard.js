import searchTracks from "../helperFunctions/searchTracks.js"
import recommendedTracks from "../helperFunctions/recommendedTracks.js"
import Searchbar from './Searchbar';
import SearchResults from './SearchResults'
import Track from './Track'
import WebPlayback from './WebPlayback'
import Recommendations from './Recommendations'
import Tree from './Tree'
import '../App.css'
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Dashboard = ( { access_token, refresh_token }) => {
    const [query, setQuery] = useState();
    const [searchResults, setSearchResults] = useState();
    const [currentSong, setCurrentSong] = useState();
    const [recommendations, setRecommendations] = useState();
    const [rootNode, setRootNode] = useState();
    const [currentNode, setCurrentNode] = useState();

    let selectedPreview = '';
    let player = new Audio('');

    // This is drilled to the Searchbar and the Searchbar will call it so we can change the state so that we can re-render SearchResults
    const onSearch = (query) => {
        setQuery(query)
    }

    //This is drilled to Track so when the card is clicked, we set current song
    const handleSetCurrentSong = (track) => {
        const node = {
            id : track.id,
            preview : track.preview,
            img : track.imgSm.url,
            height : track.imgSm.height,
            width : track.imgSm.width,
            children : []
        }

        if(!rootNode) {
            setRootNode(node);
            setCurrentNode(node);
        } else {
            if(!currentNode.children.includes(node)) {  
                currentNode.children.push(node)
            }
        }

        setCurrentSong(track);
        setCurrentNode(node);
        setSearchResults(null);

    }


    //
    const onAdd = (track) => {
        for(let i = 0; i < currentNode.children.length; i++) {
            if(currentNode.children[i].id === track.id) {
                return
            }
        }
        
        const node = {
            id : track.id,
            preview : track.preview,
            img : track.imgSm.url,
            height : track.imgSm.height,
            width : track.imgSm.width,
            children : []
        }
        currentNode.children.push(node)
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

    useEffect(() => {
        return rootNode ? () => {
            rootNode.children.push(recommendations[1])
        } : () => {}
        
        
    }, [recommendations])

    return (
        <div className = "dashboard" onClick = {null} style = {{display: "felx"}}>
            <Container className = "m-0" style = {{display: "flex"}}>
                <Container className = "m-1" style = {{maxWidth: "400px"}}>
                    <Searchbar onSearch = {onSearch}/>
                    <SearchResults searchResults = {searchResults} handleSetCurrentSong = {handleSetCurrentSong}/>
                    <Recommendations recommendations = {recommendations} handleSetCurrentSong = {handleSetCurrentSong} onAdd ={onAdd} player = {player} selectedPreview = {selectedPreview} />
                </Container>

                <Tree rootNode = {rootNode} currentNode = {currentNode}/>

            </Container>
            
            
            <Container className = "mb-2" align="center" style={{position:"absolute", bottom:"0", display:"flex"}}>
            <Track className = "currentSong" track = {currentSong} isSearch = {true}/>
            <WebPlayback access_token = {access_token} currentSong = {currentSong} style/>
            </Container>
        </div>
    )
}

export default Dashboard