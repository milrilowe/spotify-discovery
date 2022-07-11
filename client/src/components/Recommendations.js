import { Container, Card } from "react-bootstrap"
import { useState, useEffect} from 'react'
import Track from './Track'


const Recommendations = ({ recommendations, handleSetCurrentSong, onAdd, player, selectedPreview }) => {

    player.addEventListener("ended", () => {selectedPreview = ''}, false);
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
                                    onHover = {((track) => {
                                        if(selectedPreview === '') {
                                            selectedPreview = '';
                                            player.src = track.preview;
                                            player.play()
                                        }})}
                                    unHover = {() => {
                                        if(selectedPreview === '') {
                                            player.src = '';
                                            selectedPreview = '';
                                        }
                                    }}
                                    handleSetCurrentSong = {() => {
                                        player.src = '';
                                        handleSetCurrentSong(track)
                                    }}
                                    handleSetPreview = {() => {
                                        if(selectedPreview !== track) {
                                            if(player.src !== track.preview) {
                                                selectedPreview = track;
                                                player.src = track.preview;
                                                player.play()
                                            }
                                            selectedPreview = track;
                                            
                                        } else {
                                            selectedPreview = '';
                                            player.src = '';
                                        }

                                    }}
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