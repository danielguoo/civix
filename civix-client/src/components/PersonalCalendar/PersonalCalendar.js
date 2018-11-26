import React from "react"
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody
} from "reactstrap"

import { Link } from "react-router-dom"
import axios from "axios"

import NavigationBar from "../NavigationBar/NavigationBar"

import "./PersonalCalendar.css"

//An individual calendar event
//Components are:
//-Event name
//-Event date
//-Brief event description
//-'Learn More' button
//-'Mark Attending' button
class CalendarEvent extends React.Component {
  //Constructor
  //By default, 'Learn More' modal closed
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <ListGroupItem className="list-group-item">
        <h3 className="text-left">Event Name</h3>
        <h5 className="text-left">Heading</h5>
        <p className="text-left">Event description...</p>
        <ButtonGroup className="btn-group float-right" role="group">
          <Button
            className="btn btn-primary"
            type="button"
            style={{
              marginRight: 5,
              backgroundColor: "#27a0f8",
              border: "none"
            }}
            onClick={this.toggle}
          >
            Learn More...
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader className="modal-title, text-center">
                <h3>Event Name</h3>
                <h5 className="text-muted">Event time</h5>
                <h5 className="text-muted">Event date</h5>
                <h5 className="text-muted">Event location</h5>
              </ModalHeader>
              <ModalBody>Fuller event description </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </Button>
          <Button
            className="btn btn-primary"
            type="button"
            style={{ backgroundColor: "#68bd43", border: "none" }}
          >
            Remove from calendar
          </Button>
        </ButtonGroup>
      </ListGroupItem>
    )
  }
}

class PersonalCalendar extends React.Component {
  render() {
    return (
      <div>
        <div className="article-list">
          <NavigationBar />
          <Container className="container">
            <div className="intro">
              <h2 className="text-center">Personal Calendar</h2>
            </div>
          </Container>
        </div>
        <ListGroup className="list-group" style={{ margin: 44 }}>
          <CalendarEvent />
        </ListGroup>
      </div>
    )
  }
}

export default PersonalCalendar
