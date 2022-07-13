import { FaPlay, FaPause } from 'react-icons/fa'

const Play = (isPlaying) => {
    isPlaying = true;
    return isPlaying ? <FaPlay/> : <FaPause/>
}

export default Play