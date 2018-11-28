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
  ModalBody,
  Card
} from "reactstrap"

import "./CommunityCalendar.css"

import { Link } from "react-router-dom"
import axios from "axios"
import moment from "moment"

import NavigationBar from "../NavigationBar/NavigationBar"

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

    //Bind 'Learn More' toggle function
    this.toggleLearnMore = this.toggleLearnMore.bind(this)
    //Bind function to add event to personal calendar
    this.toggleMarkAttending = this.toggleMarkAttending.bind(this)
  }

  //'Learn More' toggle function
  toggleLearnMore() {
    this.setState({
      modal: !this.state.modal
    })
  }

  //'Add to Personal Calendar' function
  toggleMarkAttending() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <ListGroupItem className="list-group-item" style={{ marginBottom: 10 }}>
        <h3 className="text-left">{this.props.title}</h3>
        <h5 className="text-left">{this.props.date}</h5>
        <p className="text-left">{this.props.briefdescription}</p>
        <ButtonGroup className="btn-group float-right" role="group">
          <Button
            className="btn btn-primary"
            type="button"
            style={{
              marginRight: 5,
              backgroundColor: "#27a0f8",
              border: "none"
            }}
            onClick={this.toggleLearnMore}
          >
            Learn More...
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader className="modal-title, text-center">
                <h3>{this.props.title}</h3>
                <h5 className="text-muted">{this.props.date}</h5>
                <h5 className="text-muted">{this.props.time}</h5>
                <h5 className="text-muted">{this.props.location}</h5>
              </ModalHeader>
              <ModalBody>{this.props.fulldescription}</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleLearnMore}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </Button>
          <Button
            className="btn btn-primary"
            type="button"
            style={{ backgroundColor: "#f83842", border: "none" }}
            onClick={this.toggleMarkAttending}
          >
            Mark Attending
          </Button>
        </ButtonGroup>
      </ListGroupItem>
    )
  }
}

class CommunityCalendar extends React.Component {
  //Constructor
  constructor(props) {
    super(props)
    this.displayEvents = this.displayEvents.bind(this)
    this.state = {
      events: []
    }
  }

  //Event display function
  //Takes the fields per event and index
  displayEvents(event, i) {
    //Unpack event
    var id = event.id
    var title = event.title
    var unformatteddate = new Date(event.date.toString())
    var date = moment(unformatteddate).format("dddd, MMMM Do YYYY")
    var time = moment(unformatteddate).format("h:mm A")
    var location = "Dummylocation " + event.id
    var briefdescription = event.description
    var fulldescription = event.description

    return (
      <CalendarEvent
        id={id}
        title={title}
        date={date}
        time={time}
        location={location}
        briefdescription={briefdescription}
        fulldescription={fulldescription}
        key={i}
        index={i}
      />
    )
  }

  getEvents() {
    //Setup
    var url = "http://localhost:8000/events/"
    axios
      .get(url)
      .then(response => {
        const events = response.data
        this.setState({ events })
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message)
        }
      })
  }

  componentDidMount() {
    this.getEvents()
  }

  render() {
    return (
      <div>
        <div className="article-list">
          <NavigationBar />
          <Container className="container">
            <div className="intro">
              <h2 className="text-center">Community Calendar</h2>
              <p className="text-center">
                Upcoming political events near address: ...
              </p>
            </div>
          </Container>
        </div>
        <ListGroup className="list-group" style={{ margin: 44 }}>
          {this.state.events.map(this.displayEvents)}
        </ListGroup>
      </div>
    )
  }
}

export default CommunityCalendar
