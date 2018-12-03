import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import BigCalendar from "react-big-calendar";
import moment from "moment";

import "./Calendar.css";

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

  //'Add to Personal Calendar' function

  render() {
    var unformatteddate = new Date(this.props.date.toString());
    var cleandate = moment(unformatteddate).format("dddd, MMMM Do YYYY");
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
            onClick={() => this.props.toggleEvent(this.props.event)}
          >
            Learn More...
            
          </Button>
          
            {this.props.currentlyAttending ? <Button
            className="btn btn-primary"
            type="button"
            color="success"
            style={{ border: "none" }}
            onClick={()=> this.props.toggleMarkAttending(!this.props.currentlyAttending, this.props.id)}
          >Attending </Button>: <Button
          className="btn btn-primary"
          type="button"
          color="danger"
          style={{ border: "none" }}
          onClick={()=> this.props.toggleMarkAttending(!this.props.currentlyAttending, this.props.id)}
        > Not Attending </Button>}
          
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
    this.changeEventView = this.changeEventView.bind(this)
    this.toggleEventDetails = this.toggleEventDetails.bind(this);
    this.toggleMarkAttending = this.toggleMarkAttending.bind(this);
    this.state = {
      events: [],
      CalendarView:true,
      modal: false,
      currentEvent: null,
      myEvents: [],
      myEventView: true,
      profile:{},
      eventsFilter: 'USA'
    };
  }

  toggleMarkAttending(add, event_id) {
    //1.) Grab list of events for calendar (GET)
    //2.) Update list of events (PUT)
    //No new event created!

    //alert(global.user_id)

    var url = "http://localhost:8000/calendars/" + localStorage.getItem('user_id') + "/";
    var updatedevents = [];
    var self = this;

    //All users start out w/empty, existing calendar, so we know we can request PUT
    axios
      .get(url)
      .then(function(getcalendarresponse) {
        console.log(
          "Attempted grab of personal calendar for user " +
          localStorage.getItem('user_id') +
            " with status " +
            getcalendarresponse.status
        );

        //Update events list with relevant event id
        updatedevents = getcalendarresponse.data.events;
        console.log(updatedevents, event_id, add)
        if (add) {
          updatedevents.push(event_id);
        } else {
            console.log("Should be popping " + event_id)
            var index = updatedevents.indexOf(event_id)
            console.log("@ position " + index)
          updatedevents.splice(index, 1);
        }
        //alert("new set: " + updatedevents)
      })
      .then(function() {
        var payload = {
          user: localStorage.getItem('user_id'),
          events: updatedevents
        };
        //alert("attempting put")
        //Attempt update on existing calendar
        axios.put(url, payload).then(function(updatecalendarresponse) {
          console.log(
            "Successfully updated existing personal calendar for " +
            localStorage.getItem('user_id')
          );
          self.getEvents()
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

  toggleEventDetails(event) {
    this.setState({
      currentEvent: event,
      modal: !this.state.modal
    });
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
        currentlyAttending={this.state.myEvents.includes(id)}
        toggleEvent={this.toggleEventDetails}
        toggleMarkAttending={this.toggleMarkAttending}
      />
    );
  }

  changeView(view) {
    this.setState(() => ({
      CalendarView: view === 'calendar'
    }));
  }

  change

  changeEventView(view) {
    this.setState(() => ({
      myEventView: view === 'myEvents'
    }));
  }

  changeFilter(eventsFilter) {
    this.setState({eventsFilter})
  }

  getEvents() {
    //Setup
    const eventsurl = "http://localhost:8000/events/";
    const url = "http://localhost:8000/calendars/" + localStorage.getItem('user_id');
    const profilesurl = "http://localhost:8000/profiles/" + localStorage.getItem('user_id')
    axios.all([
      axios.get(eventsurl),
      axios.get(profilesurl),
      axios.get(url)
    ])
      .then(axios.spread((eventsresponse, profilessresponse,response) => {
        const events = eventsresponse.data;
        const myEvents = response.data.events;
        const profile = profilessresponse.data;
        this.setState({ events, myEvents, profile });
      }))
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
    const currentEvents = this.state.eventsFilter === 'USA' ? this.state.events : this.state.events.filter((event)=> event.city === this.state.eventsFilter || event.state === this.state.eventsFilter )
    return (

      <div>
        <div>
          <NavigationBar />
            <div className="intro">
            <div className="firstLine" >
              <div><h5 className="eventToggle"> <span className={this.state.myEventView ? "selected": null }onClick={() => this.changeEventView('myEvents')}>Personal</span> | <span className={this.state.myEventView ? null: "selected"} onClick={this.changeEventView}>Community</span> </h5></div>
              <div><h4>Calendar Dashboard</h4></div>
              <div><h5 className="calendarToggle"><span  className={this.state.CalendarView ? "selected": null } onClick={() => this.changeView('calendar')}>Calendar</span> | <span className={this.state.CalendarView ? null : "selected" } onClick={() => this.changeView('list')}>List</span> </h5> </div>
            </div>
              <p className="toggle">
                Upcoming political events in: <span onClick={()=>this.changeFilter(this.state.profile.city)} className={this.state.eventsFilter === this.state.profile.city ? "selected" : null }>{this.state.profile.city} </span>| <span onClick={()=>this.changeFilter(this.state.profile.state)} className={this.state.eventsFilter === this.state.profile.state ? "selected" : null }>{this.state.profile.state}</span>  | <span onClick={()=>this.changeFilter('USA')} className={this.state.eventsFilter === 'USA' ? "selected" : null }>USA</span>
              </p>
            </div>
        </div>
    {this.state.modal && <EventModal open={this.state.modal} event={this.state.currentEvent} markAttending={this.toggleMarkAttending} toggleEvent={this.toggleEventDetails} currentlyAttending={this.state.myEvents.includes(this.state.currentEvent.id)} ></EventModal> }
        {this.state.CalendarView ? <div className="CalendarChoice">
          <CalendarView toggleEvent={this.toggleEventDetails} events={this.state.myEventView ? currentEvents.filter(j => this.state.myEvents.includes(j.id)) : currentEvents}/>
        </div> : 
        <ListGroup className="list-group">
          {this.state.myEventView ? (this.state.myEvents.length !== 0 ? currentEvents.filter(j => this.state.myEvents.includes(j.id)).sort((a, b) => a.date - b.date).map(this.displayEvents) : <h3>Your calendar is currently empty.</h3>) : 
          currentEvents.sort((a, b) => new Date(a.date.toString()) - new Date(b.date.toString())).map(this.displayEvents) }
        </ListGroup> }
      </div>
    );
  }
}

const EventModal = ({event,open, toggleEvent, markAttending, currentlyAttending}) => {
  var unformatteddate = new Date(event.date.toString());
    var cleandate = moment(unformatteddate).format("dddd, MMMM Do YYYY");
    var cleantime = moment(unformatteddate).format("h:mm A");
  return (
   <Modal isOpen={open} > 
     {/* toggle={this.toggle} */}
<ModalHeader className="modal-title, text-center">
  <h3>{event.title}</h3>
  <h5 className="text-muted">{cleandate}</h5>
  <h5 className="text-muted">{cleantime}</h5>
  <h5 className="text-muted">
    {event.streetAddress
    + ", " + 
    event.city +
    ", " +
    event.state + 
    ", " + 
    event.zipcode}
  </h5>
</ModalHeader>
<ModalBody>{event.fullDescription}</ModalBody>
<ModalFooter>
  {currentlyAttending ? <Button onClick={()=>markAttending(false, event.id)}color="success"> Attending
</Button>: <Button onClick={()=>markAttending(true, event.id)}color="danger"> Not Attending
</Button>}
  

  <Button onClick={(event)=>toggleEvent(event)}color="primary">
    Close
  </Button>
</ModalFooter>
</Modal>

  )
}

export default Calendar;
