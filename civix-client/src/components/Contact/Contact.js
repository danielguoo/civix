import React from "react"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ButtonGroup,
  Container
} from "reactstrap"

import "./Contact.css"

import NavigationBar from "../NavigationBar/NavigationBar"

class ContactCard extends React.Component {
  render() {
    return (
      <div>
        <Card style={{ minWidth: 318 }}>
          <CardImg
            top
            width="100%"
            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>Representative Name</CardTitle>
            <CardSubtitle>Representative Position</CardSubtitle>
            <CardText>Brief description of representative</CardText>
            <ButtonGroup />
            <ButtonGroup className="btn-group" role="group">
              <Button color="primary" className="btn, btn-primary">
                <a href="tel:1-408-839-4367" style={{ color: "#ffffff" }}>
                  Call
                </a>
              </Button>
              <Button
                color="primary"
                className="btn, btn-primary"
                type="button"
              >
                <a
                  href="mailto:mjaneduan@gmail.com"
                  style={{ color: "#ffffff" }}
                >
                  Email
                </a>
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
    )
  }
}

class Contact extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div style={{ verticalAlign: "middle" }}>
          <Container className="card-container">
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
          </Container>
        </div>
      </div>
    )
  }
}

export default Contact
