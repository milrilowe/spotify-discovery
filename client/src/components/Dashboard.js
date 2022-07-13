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

const previewPlayer = new Audio('');
let selectedPreview;
previewPlayer.addEventListener("ended", () => {
    previewPlayer.src = '';
    selectedPreview = '';
}, false);

const Dashboard = ( { access_token, refresh_token }) => {
    const [query, setQuery] = useState();
    const [searchResults, setSearchResults] = useState();
    const [currentSong, setCurrentSong] = useState();
    const [recommendations, setRecommendations] = useState();
    const [rootNode, setRootNode] = useState();
    const [currentNode, setCurrentNode] = useState();

    selectedPreview = '';
    previewPlayer.src = '';

    console.log('current');
    console.log(currentNode);
    console.log('root');
    console.log(rootNode);

    // This is drilled to the Searchbar and the Searchbar will call it so we can change the state so that we can re-render SearchResults
    const onSearch = (query) => {
        setQuery(query)
    }

    //This is drilled to Track so when the card is clicked, we set current song
    const handleSetCurrentSong = (track) => {
        if(currentSong) {
            const node = {
                track : track,
                children : []
            }

            let contains = false;
            let i;
            for(i = 0; i < currentNode.children.length; i++) {
                if(currentNode.children[i].track === track) {
                    contains = true;
                    break;
                }
            }

            if(!contains) {
                currentNode.children.push(node);
            }
        
            setCurrentNode(currentNode.children[i]);
        }
        
        setCurrentSong(track);
        setSearchResults(null);
        previewPlayer.src = '';
    }

    //Sets root node of tree - only done through searching for new song
    const handleSetRoot = (track) => {
        const node = {
            track : track,
            children : []
        }
    
        setRootNode(node);
        setCurrentNode(node);
    }

    //
    const onAdd = (track) => {
        for(let i = 0; i < currentNode.children.length; i++) {
            if(currentNode.children[i].track === track) {
                return
            }
        }
        
        const node = {
            track : track,
            children : []
        }


        currentNode.children.push(node);
        //So we re-render the tree
        setCurrentNode({
            ...currentNode
        })
    }

    //When we hover over album image, play song (with conditions)
    const handleOnHover = (track) => {
        if(selectedPreview === '') {
            previewPlayer.src = track.preview;
            previewPlayer.play();
        }
    }

    //When we stop hovering over album image, stop playing song
    const handleUnHover = (track) => {
        if(selectedPreview === '') {
            previewPlayer.src = '';
        }
    }

    //Clicking on recommended song plays preview until it is clicked again (or the preview ends)
    const handleSetPreview = (track) => {
        if(selectedPreview !== track) {
            if(previewPlayer.src !== track.preview) {
                selectedPreview = track;
                previewPlayer.src = track.preview;
                previewPlayer.play()
            }
            selectedPreview = track;
            
        } else {
            selectedPreview = '';
            previewPlayer.src = '';
        }
    }

    //Breadth-first search of tree to find the node with track
    const handleSetCurrentNode = (track) => {
        let queue = [];
        queue.push(rootNode);
        while(queue.length !== 0) {
            let compare = queue.pop();
            if(compare.track.id === track.id) {

                setCurrentNode({
                    track: compare.track,
                    children: compare.children
                });

                setCurrentSong(compare.track)

                return;
            } else {
                for(let i = 0; i < compare.children.length; i++) {
                    queue.push(compare.children[i]);
                }
            }
        }
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
        <div className = "dashboard" onClick = {null} style = {{display: "felx"}}>
            <Container className = "m-0" style = {{display: "flex"}}>
                <Container className = "m-1" style = {{maxWidth: "400px"}}>
                    <Searchbar 
                        onSearch = {onSearch}
                    />
                    <SearchResults 
                        searchResults = {searchResults} handleSetCurrentSong = {handleSetCurrentSong}
                        handleSetRoot = {handleSetRoot}
                    />
                    <Recommendations
                        recommendations = {recommendations} handleSetCurrentSong = {handleSetCurrentSong}
                        handleOnHover = {handleOnHover}
                        handleUnHover = {handleUnHover}
                        handleSetPreview = {handleSetPreview}
                        onAdd ={onAdd} 
                    />
                </Container>

                <Container className="mt-3">
                    <Tree 
                        rootNode = {rootNode} 
                        currentNode = {currentNode}
                        handleSetCurrentNode = {handleSetCurrentNode}
                        handleOnHover = {handleOnHover}
                        handleUnHover = {handleUnHover}
                        handleSetPreview = {handleSetPreview}
                    />
                </Container>
            </Container>
            
            
            <Container className = "mb-2" align="center" style={{position:"absolute", bottom:"0", display:"flex"}}>
            <Track className = "currentSong" track = {currentSong} isSearch = {true}/>
            <WebPlayback access_token = {access_token} currentSong = {currentSong} style/>
            </Container>
        </div>
    )
}

export default Dashboard