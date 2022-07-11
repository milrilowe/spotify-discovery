import { GrFormAdd } from 'react-icons/gr'

const Add = ({onAdd, track, isSearch}) => {

    if(isSearch) {
        return
    } else {
        return (
            <GrFormAdd style = {{cursor: "pointer"}}
                        onClick = {(event) => {
                            event.stopPropagation();
                            onAdd(track)}}
                        onDoubleClick = {(event) => {
                                    event.stopPropagation();
                        }}
                />
        )
    }
}

export default Add