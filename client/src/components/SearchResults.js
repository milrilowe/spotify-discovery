import { Container, Card } from "react-bootstrap"
import { useState, useEffect} from 'react'
import Track from './Track'


const SearchResults = ({ searchResults, handleSetCurrentSong, handleSetRoot }) => {
    
    let results;

    if (searchResults) {
        try {
            results = searchResults.map(track => {
                return track;
            })
        } catch {
            return
        }

        return (
            <Container className="p-0" style = {{position: "relative"}}>
                <Container style = {{position: "absolute", zIndex:"2"}}>
                    <Card style ={{maxHeight: "640px", overflow:"auto"}}>
                        {results?.map((track) => (
                                <Track 
                                    track = {track} 
                                    handleSetCurrentSong = {handleSetCurrentSong} 
                                    handleSetRoot = {handleSetRoot} 
                                    isSearch = {true}
                                />
                        ))}
                    </Card>
                </Container>
            </Container>
        )

    } else {
        return
    }

}

export default SearchResults