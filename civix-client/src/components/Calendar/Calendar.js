import React from "react";
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
} from "reactstrap";

import BigCalendar from "react-big-calendar";
import moment from "moment";

import "./Calendar.css";

import { Link } from "react-router-dom";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import NavigationBar from "../NavigationBar/NavigationBar";

const localizer = BigCalendar.momentLocalizer(moment);
//An individual calendar event
//Components are:
//-Event name
//-Event date
//-Brief event description
//-'Learn More' button
//-'Mark Attending' button

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

// var id = event.id;
// var title = event.title;
// var date = event.date;
// var briefDescription = event.briefDescription;
// var fullDescription = event.fullDescription;
// var streetAddress = event.streetAddress;
// var city = event.city;
// var state = event.state;
// var zipcode = event.zipcode;

let CalendarView = ({events, toggleEvent}) => (
  <BigCalendar titleAccessor={event=> event.title} 
    onSelectEvent={(event)=> toggleEvent(event)}
   views={['month']}
    startAccessor={(event) => { return moment(event.date) }}
    endAccessor={(event) => { return moment(event.date) }}
    events={events} step={60} localizer={localizer} />
);



class CalendarEvent extends React.Component {
  //Constructor
  //By default, 'Learn More' modal closed
  constructor(props) {
    super(props);
    //Bind function to add event to personal calendar
    this.toggleMarkAttending = this.toggleMarkAttending.bind(this);
  }

  //'Add to Personal Calendar' function
  toggleMarkAttending() {
    //1.) Grab list of events for calendar (GET)
    //2.) Update list of events (PUT)
    //No new event created!

    //alert(global.user_id)

    var url = "http://localhost:8000/calendars/" + global.user_id + "/";
    var updatedevents = [];
    var self = this;

    //All users start out w/empty, existing calendar, so we know we can request PUT
    axios
      .get(url)
      .then(function(getcalendarresponse) {
        console.log(
          "Attempted grab of personal calendar for user " +
            global.user_id +
            " with status " +
            getcalendarresponse.status
        );

        //Update events list with relevant event id
        updatedevents = getcalendarresponse.data.events;
        updatedevents.push(self.props.id);
        //alert("new set: " + updatedevents)
      })
      .then(function() {
        var payload = {
          user: global.user_id,
          events: updatedevents
        };
        //alert("attempting put")
        //Attempt update on existing calendar
        axios.put(url, payload).then(function(updatecalendarresponse) {
          console.log(
            "Successfully updated existing personal calendar for " +
              global.user_id
          );
        });
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  render() {
    var unformatteddate = new Date(this.props.date.toString());
    var cleandate = moment(unformatteddate).format("dddd, MMMM Do YYYY");
    var cleantime = moment(unformatteddate).format("h:mm A");
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
            onClick={(event) => this.props.toggleEvent(this.props.event)}
          >
            Learn More...
            
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
    );
  }
}

class Calendar extends React.Component {
  //Constructor
  constructor(props) {
    super(props);
    this.displayEvents = this.displayEvents.bind(this);
    this.changeView = this.changeView.bind(this);
    this.toggleEventDetails = this.toggleEventDetails.bind(this);
    this.state = {
      events: [],
      CalendarView:true,
      modal: false,
      currentEvent: null
    };
  }

  toggleEventDetails(event) {
    this.setState({
      currentEvent: event,
      modal: !this.state.modal
    });
    console.log(this.state)
  }
  //Event display function
  //Takes the fields per event and index
  displayEvents(event, i) {
    //Unpack event
    var id = event.id;
    var title = event.title;
    var date = event.date;
    var briefDescription = event.briefDescription;
    var fullDescription = event.fullDescription;
    var streetAddress = event.streetAddress;
    var city = event.city;
    var state = event.state;
    var zipcode = event.zipcode;

    return (
      <CalendarEvent
        event={event}
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
        toggleEvent={this.toggleEventDetails}
      />
    );
  }

  changeView(view) {
    this.setState(() => ({
      CalendarView: view === 'calendar'
    }));
  }

  getEvents() {
    //Setup
    var url = "http://localhost:8000/events/";
    axios
      .get(url)
      .then(response => {
        const events = response.data;
        this.setState({ events });
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <div>
        <div>
          <NavigationBar />
          <Container className="container">
            <div className="intro">
            <div className="firstLine" >
              <h2>Community Calendar</h2>
              <div className="calendarToggle"><h3 onClick={() => this.changeView('calendar')}>Calendar </h3> | <h3 onClick={() => this.changeView('list')}>List</h3> </div>
              </div>
              <p className="text-center">
                Upcoming political events near address: ...
              </p>
            </div>
          </Container>
        </div>
    {this.state.modal && <EventModal open={this.state.modal} event={this.state.currentEvent} toggleEvent={this.toggleEventDetails} ></EventModal> }
        {this.state.CalendarView ? <div className="CalendarChoice">
          <CalendarView toggleEvent={this.toggleEventDetails} events={this.state.events}/>
        </div> : 
        <ListGroup className="list-group" style={{ margin: 44 }}>
          {this.state.events
            .sort((a, b) => a.date - b.date)
            .map(this.displayEvents)}
        </ListGroup> }
      </div>
    );
  }
}

const EventModal = ({event,open, toggleEvent}) => {
  return (
   <Modal isOpen={open} > 
     {/* toggle={this.toggle} */}
<ModalHeader className="modal-title, text-center">
  <h3>{event.title}</h3>
  {/* <h5 className="text-muted">{cleandate}</h5>
  <h5 className="text-muted">{cleantime}</h5> */}
  <h5 className="text-muted">
    {event.streetAddress}
    {", "}
    {event.city}
    {", "}
    {event.state}
    {", "}
    {event.zipcode}
  </h5>
</ModalHeader>
<ModalBody>{event.fullDescription}</ModalBody>
<ModalFooter>
  <Button onClick={(event)=>toggleEvent(event)}color="primary">
    Close
  </Button>
</ModalFooter>
</Modal>
  )
}

export default Calendar;
