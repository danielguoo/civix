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
    //1.) Grab list of events for calendar (GET)
    //2.) Update list of events (PUT)
    //No new event created!

    //alert(global.user_id)

    var url = "http://localhost:8000/calendars/" + global.user_id + "/"
    var updatedevents = []
    var self = this

    //All users start out w/empty, existing calendar, so we know we can request PUT
    axios
      .get(url)
      .then(function(getcalendarresponse) {
        console.log(
          "Attempted grab of personal calendar for user " +
            global.user_id +
            " with status " +
            getcalendarresponse.status
        )

        //Update events list with relevant event id
        updatedevents = getcalendarresponse.data.events
        updatedevents.push(self.props.id)
        //alert("new set: " + updatedevents)
      })
      .then(function() {
        var payload = {
          user: global.user_id,
          events: updatedevents
        }
        //alert("attempting put")
        //Attempt update on existing calendar
        axios.put(url, payload).then(function(updatecalendarresponse) {
          console.log(
            "Successfully updated existing personal calendar for " +
              global.user_id
          )
        })
      })
      .catch(function(error) {
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

  render() {
    var unformatteddate = new Date(this.props.date.toString())
    var cleandate = moment(unformatteddate).format("dddd, MMMM Do YYYY")
    var cleantime = moment(unformatteddate).format("h:mm A")
    return (
      <ListGroupItem className="list-group-item" style={{ marginBottom: 10 }}>
        <h3 className="text-left">{this.props.title}</h3>
        <h5 className="text-left">{cleandate}</h5>
        <p className="text-left">{this.props.briefDescription}</p>
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
                <h5 className="text-muted">{cleandate}</h5>
                <h5 className="text-muted">{cleantime}</h5>
                <h5 className="text-muted">
                  {this.props.streetAddress}
                  {", "}
                  {this.props.city}
                  {", "}
                  {this.props.state}
                  {", "}
                  {this.props.zipcode}
                </h5>
              </ModalHeader>
              <ModalBody>{this.props.fullDescription}</ModalBody>
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
    var date = event.date
    var briefDescription = event.briefDescription
    var fullDescription = event.fullDescription
    var streetAddress = event.streetAddress
    var city = event.city
    var state = event.state
    var zipcode = event.zipcode

    return (
      <CalendarEvent
        id={id}
        title={title}
        date={date}
        streetAddress={streetAddress}
        city={city}
        state={state}
        zipcode={zipcode}
        briefDescription={briefDescription}
        fullDescription={fullDescription}
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
