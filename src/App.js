import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  InputGroup,
  FormControl,
  Button,
  Image,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap";
import "./App.css";
import Axios from "axios";

function App() {
  const [loginState, setLoginState] = useState(0);
  const [apiKey, setApiKey] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userDp, setUserDp] = useState(null);

  function handleApiChange(e) {
    const valueEdit = e.target.value;
    setApiKey(valueEdit);
  }

  function loginWithApiKey() {
    setLoginState(1)

    Axios.get("https://dev.to/api/users/me", {
      headers: {
        "api-key": apiKey,
      },
    }).then(function (response) {
      console.log(response);
      setUserDp(response.data.profile_image)
      setUserName(response.data.username)
      setLoginState(2)
    })
  }

  return (
    <div className="App">
      <Container fluid className="mt-4">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Dev.to Content Reviewer</Navbar.Brand>
            <Nav className="me-auto"></Nav>
          </Container>
        </Navbar>
      </Container>

      {loginState === 0 && (
        <Container fluid className="mt-4">
          <h2>
            Enter your <strong>Dev.to</strong> api key
          </h2>

          <InputGroup className="mb-3 mt-3 mx-auto">
            <FormControl
              placeholder="API Key"
              aria-label="API Key"
              aria-describedby="basic-addon2"
              onChange={handleApiChange}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={loginWithApiKey}
            >
              Login
            </Button>
          </InputGroup>
        </Container>
      )}

      {loginState === 1 && (
        <Container className="my-4">
          <Spinner animation="grow" />
          <p>Fetching your account</p>
        </Container>
      )}

      {loginState === 2 && (
        <Container fluid>
          <Image
            roundedCircle
            width={100}
            height={100}
            src={userDp}
          ></Image>
          <h4 className="mt-2">{userName}</h4>

          <ListGroup as="ol" numbered className="my-4">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                Published
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                Draft
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Container>
      )}
    </div>
  );
}

export default App;
