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

import "./PersonalCalendar.css"

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
    this.toggleRemove = this.toggleRemove.bind(this)
  }

  //'Learn More' toggle function
  toggleLearnMore() {
    this.setState({
      modal: !this.state.modal
    })
  }

  //'Add to Personal Calendar' function
  toggleRemove() {
    this.props.removeEvent(this.props.index)

    //1.) Remove event from display
    //2.) Update list of events (PUT)

    var url = "http://localhost:8000/calendars/" + global.user_id + "/"

    //alert("Not yet empty, remove from display")
    var currenteventids = this.props.currenteventids
    var indexOfEvent = currenteventids.indexOf(this.props.id)
    var neweventids = currenteventids.splice(indexOfEvent, 1)

    //alert("after removal, we now have just these events: " + neweventids)

    var removalpayload = {
      user: global.user_id,
      events: neweventids
    }

    axios
      .put(url, removalpayload)
      .then(function(removalresponse) {
        console.log(
          "Successfully removed event from personal calendar for user " +
            global.user_id
        )
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
            style={{ backgroundColor: "#82db54", border: "none" }}
            onClick={this.toggleRemove}
          >
            Remove
          </Button>
        </ButtonGroup>
      </ListGroupItem>
    )
  }
}

class PersonalCalendar extends React.Component {
  //Constructor
  constructor(props) {
    super(props)
    this.displayEvents = this.displayEvents.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.state = {
      eventids: [],
      events: []
    }
  }

  //Event removal function
  removeEvent(idx) {
    var eventidarr = this.state.eventids
    var eventarr = this.state.events
    eventidarr.splice(idx, 1)
    eventarr.splice(idx, 1)
    this.setState({ eventidarr: eventidarr, eventarr: eventarr })
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
        currenteventids={this.state.eventids}
        removeEvent={this.removeEvent}
      />
    )
  }

  getEvents() {
            
    //Setup
    var calendarurl = "http://localhost:8000/calendars/" + global.user_id + "/"
    var eventids = []
    var self = this

    axios
      .get(calendarurl)
      .then(response => {
        eventids = response.data.events
        //alert(eventids)
        self.setState({ eventids: eventids })
      })
      .then(function() {
        var events = []
        var promises = []

        //alert("Attempting pushing all events")

        eventids.forEach(function(eventid) {
          var eventurl = "http://localhost:8000/events/" + eventid + "/"
          promises.push(axios.get(eventurl))
        })

        axios.all(promises).then(function(results) {
          results.forEach(function(response) {
            events.push(response.data)
          })

          self.setState({ events: events })
        })
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
              <h2 className="text-center">Personal Calendar</h2>
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

export default PersonalCalendar
