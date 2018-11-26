import React from "react"
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Badge,
  ListGroup,
  ListGroupItem
} from "reactstrap"

import "./PropositionPage.css"

import NavigationBar from "../NavigationBar/NavigationBar"

class ForList extends React.Component {
  render() {
    return (
      <ListGroup className="list-group">
        <ListGroupItem className="list-group-item" style={{ marginBottom: 6 }}>
          <p style={{ color: "#000000" }}>
            <b>Sara Doe</b>: Supportive argument for proposition. <br />
          </p>
          <ButtonGroup className="btn-group" role="group">
            <Button color="primary" className="btn, btn-primary">
              Upvote <Badge style={{ backgroundColor: "#7fdc4f" }}>4</Badge>
            </Button>
            <Button color="primary" className="btn, btn-primary" type="button">
              Downvote <Badge style={{ backgroundColor: "#ff3a45" }}>2</Badge>
            </Button>
          </ButtonGroup>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

class AgainstList extends React.Component {
  render() {
    return (
      <ListGroup className="list-group">
        <ListGroupItem className="list-group-item" style={{ marginBottom: 6 }}>
          <p style={{ color: "#000000" }}>
            <b>Phillip Brill</b>: Argument against proposition. <br />
          </p>
          <ButtonGroup className="btn-group" role="group">
            <Button color="primary" className="btn, btn-primary">
              Upvote <Badge style={{ backgroundColor: "#7fdc4f" }}>4</Badge>
            </Button>
            <Button color="primary" className="btn, btn-primary" type="button">
              Downvote <Badge style={{ backgroundColor: "#ff3a45" }}>2</Badge>
            </Button>
          </ButtonGroup>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

class PropositionPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="article-list">
          <Container className="container">
            <div className="intro">
              <h2 className="text-center">Proposition Page</h2>
            </div>
          </Container>
          <Row>
            <Col xs="6" sm="4">
              <h3>For</h3>
              <span>
                <textarea
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    width: "90%",
                    height: 150
                  }}
                />
              </span>
              <Button>Submit</Button>
              <ForList />
            </Col>
            <Col xs="6" sm="4">
              <h4>Description</h4>
              <p>A description of the proposition.</p>
            </Col>
            <Col sm="4">
              <h3>Against</h3>
              <span>
                <textarea
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    width: "90%",
                    height: 150
                  }}
                />
              </span>
              <Button>Submit</Button>
              <AgainstList />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default PropositionPage
