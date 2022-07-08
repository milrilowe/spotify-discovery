import { Container, Form } from "react-bootstrap"
import { useState, useEffect} from 'react'

const Searchbar = ({ search, onSearch }) => {

    return (
        <Container className = "mt-3">
            <Form.Control
                className = "searchBar"
                type="search"
                placeholder="Search Songs"
                onChange={e => onSearch(e.target.value)}
                value = {search}
            />
         </Container>
      )
}

export default Searchbar