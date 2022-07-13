import { Container, Card } from "react-bootstrap"
import { useState, useEffect} from 'react'
import Track from './Track'


const Recommendations = ({ recommendations, handleSetCurrentSong, handleOnHover, handleUnHover, handleSetPreview, onAdd }) => {

    
    if (recommendations) {
        recommendations = recommendations.map((track) => {
            return track;
        })

        const setPreview = () => {

        }

        return (
                <Container >
                    <Card className = "mt-3" style ={{maxHeight: "625px", overflow:"auto", position: "relative"}}>
                        {recommendations?.map((track) => (
                                <Track
                                    track = {track} 
                                    onHover = {() => {
                                        handleOnHover(track);    
                                    }}
                                    unHover = {() => {
                                        handleUnHover(track);
                                    }}
                                    handleSetCurrentSong = {() => {
                                        handleSetCurrentSong(track)
                                    }}
                                    handleSetPreview = {() =>
                                        handleSetPreview(track)}
                                    onAdd = {onAdd}
                                />
                        ))}
                    </Card>
                </Container>
        )
    } else {
        return 
    }
}

export default Recommendations