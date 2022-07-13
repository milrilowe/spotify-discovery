import {Container, Card} from 'react-bootstrap';

const Tree = ({rootNode, currentNode, handleSetCurrentSong, handleOnHover, handleUnHover, handleSetPreview}) => {
    console.log()
    if (rootNode) {
        let children = rootNode.children.map((node) => {
            return node;
        })
        return (
            <Container style = {{display:"flex", flexDirection:"column"}}>
                <Container >
                    <Card.Img 
                        onMouseEnter = {() => {
                            handleOnHover(rootNode.track);
                        }}
                        onMouseLeave = {() => {
                            handleUnHover(rootNode.track);
                        }}
                        onClick = {() => {
                            handleSetPreview(rootNode.track);
                        }}
                        onDoubleClick = {() => {
                            handleSetCurrentSong(rootNode.track);
                        }}
                        
                        style ={{height: "64px", width: "64px"}}
                        src = {rootNode.track.imgSm.url}
                    />
                </Container>
                <Container style ={{display:"flex"}}>
                    {children?.map((node) => (
                        <Card.Img 
                            onMouseEnter = {() => {
                                handleOnHover(node.track);
                            }}
                            onMouseLeave = {() => {
                                handleUnHover(node.track);
                            }}
                            onClick = {() => {
                                handleSetPreview(node.track);
                            }}
                            onDoubleClick = {() => {
                                handleSetCurrentSong(node.track);
                            }}
                            style ={{height: "64px", width: "64px"}}
                            src = {node.track.imgSm.url} 
                        />
                    ))}
                </Container>
            </Container>
        )
    }
}

export default Tree