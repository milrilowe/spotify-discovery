import { Container, Form } from "react-bootstrap"
import { useState, useEffect} from 'react'

const Searchbar = ({ access_token, onSearch }) => {

    return (
        <Container className = "mt-3">
            <Form.Control
                className = "searchBar"
                type="search"
                placeholder="Search Songs/Artists"
                onChange={e => onSearch(e.target.value)}
            />
         </Container>
      )
}

export default Searchbar