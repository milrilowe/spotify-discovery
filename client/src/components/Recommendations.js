import { Container, Card } from "react-bootstrap"
import { useState, useEffect} from 'react'
import Track from './Track'



const Recommendations = ({ recommendations, onClick }) => {
    
    let player = new Audio('');
    if (recommendations) {
        recommendations = recommendations.map((track) => {
            return track;
        })

        return (
                <Container >
                    <Card className = "mt-3" style ={{maxHeight: "625px", overflow:"auto", position: "relative"}}>
                        {recommendations?.map((track) => (
                                <Track
                                    track = {track} 
                                    onHover = {((track) => {
                                        player.src = track.preview;
                                        player.play()})}
                                    unHover = {() => {
                                        player.src = '';}}
                                    onClick = {() => {
                                        player.src = '';
                                        onClick(track);
                                    }}
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