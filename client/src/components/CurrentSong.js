import { Container, Card } from 'react-bootstrap'
import {useEffect } from 'react'

const CurrentSong = ( {currentSong} ) => {
    if(currentSong) {
        return (
                <Card className = "mt-3">
                    <Card.Img src = {currentSong.imgLg.url} style ={{height: "64px", width: "64px"}} />
                    <Card.Title className = "m-0 mt-1">{currentSong.name}</Card.Title>
                    <Card.Text>{currentSong.artist}</Card.Text>
                </Card>
        )
    }
}

export default CurrentSong