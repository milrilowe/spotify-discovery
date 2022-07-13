import {Container, Card} from 'react-bootstrap';

const Tree = ({rootNode, currentNode, handleOnHover, handleUnHover, handleSetPreview, handleSetCurrentNode}) => {
    console.log()
    if (rootNode) {

        let queue = [];
        let breadth = [];

        queue.push(rootNode);
        breadth.push(rootNode);

        while(queue.length > 0) {
            let root = queue.pop();
            if(root.children.length > 0) {
                for(let i = 0; i < root.children.length; i++) {
                    queue.push(root.children[i]);
                    breadth.push(root.children[i]);
                }
            }
        }
        console.log(breadth);

        return (
            <Card style = {{display:"flex", flexDirection:"column", maxHeight: "625px", overflow:"auto", position: "relative"}}>
                {breadth?.map((root) => (
                    <Container style ={{display:"flex"}}>
                        <Card.Img 
                            onMouseEnter = {() => {
                                handleOnHover(root.track);
                            }}
                            onMouseLeave = {() => {
                                handleUnHover(root.track);
                            }}
                            onClick = {() => {
                                handleSetPreview(root.track);
                            }}
                            onDoubleClick = {() => {
                                handleSetCurrentNode(root.track);
                            }}
                            style ={{height: "64px", width: "64px"}}
                            src = {root.track.imgSm.url} 
                        />
                        {root.children?.map((node) => (
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
                                handleSetCurrentNode(node.track);
                            }}
                            style ={{height: "64px", width: "64px"}}
                            src = {node.track.imgSm.url} 
                        />
                        ))}
                    </Container>
                ))} 
            </Card>
        )
    }
}

export default Tree