import { Container, Card } from "react-bootstrap"
import { useState, useEffect} from 'react'
import Add from './Add'
import '../App.css'


const Track = ({ track, handleSetPreview, handleSetCurrentSong, onHover, unHover, onAdd, isSearch, isSelected }) => {
    if(track) {
        const songName = track.name;
        const artist = track.artist;
        const image = track.imgSm.url;

        //Track can exist as a list of recommended songs, or as a list of search results, and depending on which it is, double clicking vs. single clicking track does different things
        let singleClick;
        let doubleClick;

        if(isSearch) {
            singleClick = () => handleSetCurrentSong(track)
            doubleClick = () => {return}
        } else {
            singleClick = () => {
                isSelected = true;
                handleSetPreview()
            }
            doubleClick = () => handleSetCurrentSong(track)
        }

        if(!onHover) {
            onHover = () => {return}
        }

        if(!unHover) {
            unHover = () => {return}
        }

        return( 
                <Card className = "track"
                style={{display: 'flex', flexDirection: 'row', width:'100%'}} onClick = {singleClick} onDoubleClick = {doubleClick}
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
                    <Add onAdd = {onAdd} track = {track} isSearch = {isSearch}/>
                </Card>


        )
    }
}

export default Track