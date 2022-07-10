import { Container } from 'react-bootstrap'

const Login = () => {
    return (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <a className="btn btn-success btn-lg" href={"http://localhost:3000/login"}>
            Login With Spotify
          </a>
        </Container>
      )
}

export default Login