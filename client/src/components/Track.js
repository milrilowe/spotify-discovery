import { Container, Card } from "react-bootstrap"
import { useState, useEffect} from 'react'
import Add from './Add'


const Track = ({ track, onClick, onHover, unHover, onAdd }) => {

    const songName = track.name;
    const artist = track.artist;
    const image = track.imgSm.url;

    if(!onClick) {
        onClick = () =>{
            return
        }
    }

    if(!onHover) {
        onHover = () =>{
            return
        }
    }

    if(!unHover) {
        unHover = () =>{
            return
        }
    }

    return( 
            <Card 
            style={{display: 'flex', flexDirection: 'row', width:'100%'}} onClick = {e => {
                onClick(track)
                e.stopPropogation()
            }}
            >
                <Card.Img 
                    src = {image} 
                    style ={{height: "64px", width: "64px"}}
                    onMouseEnter={() => onHover(track)}
                    onMouseLeave={() => unHover()}
            />
                <Container style ={{overflow:"hidden"}}>
                    <Card.Title 
                    className = "pb-2 m-0"
                    style ={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}
                    >
                        {songName}
                    </Card.Title>
                    
                    <Card.Text 
                        className = "mb-1"
                        style ={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}
                    >
                        {artist}
                    </Card.Text>
                </Container>
                <Add onAdd = {(event) => {onAdd(track, event)}}/>
            </Card>

    )
}

export default Track