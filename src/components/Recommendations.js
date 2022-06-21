import { Container, Card } from "react-bootstrap"
import { useState, useEffect} from 'react'
import Track from './Track'



const Recommendations = ({ recommendations, access_token, onClick }) => {
    
    let player = new Audio('');
    if (recommendations) {
        recommendations = recommendations.map((track) => {
            return track;
        })

        return (
                <Container className = "mt-3" style = {{position: "relative"}} >
                    <Card style ={{maxHeight: "625px", overflow:"auto"}}>
                        {recommendations?.map((track) => (
                                <Track
                                    track = {track} 
                                    onHover = {((track) => {
                                        player.src = track.preview;
                                        player.play()})}
                                    unHover = {() => {
                                        player.src = '';}}
                                    onClick = {() => onClick(track)}
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